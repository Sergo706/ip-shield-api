/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { contactSchema, type Contact } from '#layers/shared-layer/shared/types/ContactSchema';
import parseEnv from '~~/lib/envParser';
import z from 'zod';
import { limitBytes} from '@riavzon/auth-h3client';
import {  validateZodSchema } from '@riavzon/utils';

const contactEnv = z.object({
  TURNSTILE: z.string(),
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
    return {
        ok: false,
        date: new Date().toISOString(),
        reason: 'Captcha token is required'
    };
  }

  const turnstileSecret = env.TURNSTILE;
  const resendApiKey = env.RESEND_API_KEY;

  if (!turnstileSecret || !resendApiKey) {
    log.error('Missing Envs');
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
  console.log('Attempting to send email via Resend...');
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
      ok: false,
      date: new Date().toISOString(), 
      data: 'Successfully submitted!' 
    };
  } catch (err: unknown) {
    log.error({ err}, 'FATAL SERVER ERROR IN CONTACT API:');
    setResponseStatus(event, 500);
      return {
        ok: false,
        date: new Date().toISOString(),
        reason:  'Failed to send email' 
      };
  }
});