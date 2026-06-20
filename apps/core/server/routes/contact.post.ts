/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { contactSchema, type Contact } from '#layers/shared-layer/shared/types/ContactSchema';
import parseEnv from '~~/lib/envParser';
import z from 'zod';
import { limitBytes} from '@riavzon/auth-h3client';
import {  validateZodSchema } from '@riavzon/utils';

const contactEnv = z.object({
  NUXT_TURNSTILE_SECRET_KEY: z.string(),
  RESEND_API_KEY: z.string(),
});

export type Env = z.infer<typeof contactEnv>;
const env = parseEnv<Env>(contactEnv);

export default defineEventHandler(async (event) => {
  const log = getLogger().child({service: 'app', branch: 'handler', type: 'contact'});


  await limitBytes(1000000)(event);
  const body = event.context.body as Contact;

  const validation = validateZodSchema(contactSchema, body, log);
      if ('valid' in validation) {
          setResponseStatus(event, 400);
          return {
              ok: false,
              date: new Date().toISOString(),
              reason: JSON.stringify(validation.errors)
          };
      }


  const { token, email, fullname, subject, message } = validation.data;

  if (!token) {
    setResponseStatus(event, 400);
    log.info(`Rejected contact form Captcha token is required`);
    return {
        ok: false,
        date: new Date().toISOString(),
        reason: 'Captcha token is required'
    };
  }

  const turnstileSecretVar = env.NUXT_TURNSTILE_SECRET_KEY;
  const resendApiKey = env.RESEND_API_KEY;

  const config = useRuntimeConfig(event);
  const turnstileSecret = config.turnstile.secretKey;

  if (!turnstileSecret || !turnstileSecretVar) {
    log.error('Missing Turnstile Secret');
    setResponseStatus(event, 500);
    return {
        ok: false,
        date: new Date().toISOString(),
        reason: 'Server Error'
    };
  }


  if (!resendApiKey) {
    log.error('Missing Resend API Key');
    setResponseStatus(event, 500);
    return {
        ok: false,
        date: new Date().toISOString(),
        reason: 'Server Error'
    };
  }


  const verifyResponse = await verifyTurnstileToken(token, event);

  if (!verifyResponse.success) {
    log.error('Captcha verification failed');
    setResponseStatus(event, 400);
    return {
       ok: false,
       date: new Date().toISOString(),
       reason: 'Captcha verification failed'
    };
  }


  const emailHtml = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${fullname ?? ''}</p>
    <p><strong>Email:</strong> ${email ?? ''}</p>
    <p><strong>Subject:</strong> ${subject ?? ''}</p>
    <h3>Message:</h3>
    <p>${message ?? ''}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@riavzon.com',
        to: 'sergo998826@gmail.com',
        subject: `(IP Shield) New contact inquiry: ${subject ?? 'No subject'}`,
        html: emailHtml,
        reply_to: email ?? '',
      }),
    });

    const data = await response.json() as { id?: string; error?: unknown };

    if (!response.ok || data.error) {
      log.error({ data },'Resend error:');
      setResponseStatus(event, 500);
      return {
        ok: false,
        date: new Date().toISOString(),
        reason:  'Failed to send email' 
      };
    }

    log.info(`Email sent successfully! ID: ${data.id ?? ''}`);
    return { 
      ok: true,
      date: new Date().toISOString(), 
      data: 'Successfully submitted!' 
    };
  } catch (err: unknown) {
    log.error({ err}, 'FATAL SERVER ERROR IN CONTACT API');
    setResponseStatus(event, 500);
      return {
        ok: false,
        date: new Date().toISOString(),
        reason:  'Failed to send email' 
      };
  }
});