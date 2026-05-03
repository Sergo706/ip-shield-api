import { useAuthData, type AuthState } from "@riavzon/auth-h3client/client";

export default defineNuxtRouteMiddleware(async (to) => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isMagicLink = to.path.startsWith('/auth/verify') || to.path.startsWith('/auth/bounce') || to.query.token || to.query.reason;
  const isOAuthRoute = to.path.startsWith('/oauth/');
  const isApiRoute = to.path.startsWith('/api/');
  
  if (isMagicLink) {
    useState('auth', () => ({ authorized: false, mfaRequired: false }));
    return;
  }

  if (isOAuthRoute || isApiRoute) return;

  const mfa = useState<AuthState>('auth');
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (mfa.value && mfa.value.mfaRequired && !mfa.value.authorized) return;
  
  await useAuthData();
});
