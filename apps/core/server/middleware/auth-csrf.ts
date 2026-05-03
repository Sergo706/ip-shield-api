import { botDetectorMiddleware, generateCsrfCookie, isIPValid, } from "@riavzon/auth-h3client";

export default defineEventHandler(async (event) => {
    const { pathname } = getRequestURL(event);

  if (isMethod(event, 'HEAD') || pathname === '/api/health' || pathname.startsWith('/api/_mdc') || pathname.startsWith('/_nuxt') || 
  pathname.startsWith('/api/public')) {
    if (isMethod(event, 'HEAD') || pathname === '/api/health') {
      sendNoContent(event);
    }
    return;
  }

  const forwardedFor = getHeader(event, 'x-forwarded-for');
  if (forwardedFor === '127.0.0.1' || forwardedFor === '::1') {
    return;
  }

  isIPValid(event);
  await botDetectorMiddleware(event);
  generateCsrfCookie(event);
});