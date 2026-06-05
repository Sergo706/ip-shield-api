/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useAuthData, type AuthState } from "@riavzon/auth-h3client/client";

export default defineNuxtRouteMiddleware(async (to) => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isMagicLink = to.path.startsWith('/auth/verify') || to.path.startsWith('/auth/bounce') || to.query.token || to.query.reason;
  const isOAuthRoute = to.path.startsWith('/oauth/');
  const isApiRoute = to.path.startsWith('/api/v1');
  
  if (isMagicLink) {
    useState('auth', () => ({ authorized: false, mfaRequired: false }));
    return;
  }

  if (isOAuthRoute || isApiRoute) return;

  await useAuthData();
  const auth = useState<AuthState>('auth');
  const isProtectedRoute = to.path.startsWith('/dashboard');

  if (auth.value?.mfaRequired && !auth.value?.authorized) {
      if (isProtectedRoute) {
          return navigateTo({
            path: '/',
            query: {
              type: 'mfa'
            }
          });
        }
  }

  if (!auth.value?.authorized) {
      if (isProtectedRoute) {
        return navigateTo({
          path: '/',
          query: {
            type: 'login'
          }
        });
      }
  }
  
  if (to.path === '/' && auth.value?.authorized) {
    return navigateTo('/dashboard');
  }
  
});
