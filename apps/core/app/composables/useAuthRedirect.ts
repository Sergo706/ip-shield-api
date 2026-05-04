import type { AuthState } from '@riavzon/auth-h3client/client';
import AuthModalPopOver from '~/components/Auth/AuthModalPopOver.vue';

export async function useAuthRedirect(redirectTo: string, msg?: string) {
    const auth = useState<AuthState>('auth');
    const overlay = useOverlay();
    const modal = overlay.create(AuthModalPopOver);

    if (auth.value.mfaRequired) {
      const instance = modal.open({
                msg,
                navigateTo: redirectTo
      });

       await instance.result;
       return await navigateTo('/');
    } else if (!auth.value.authorized) {
        return await navigateTo('/');
    }
}