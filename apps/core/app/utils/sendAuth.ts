/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type z from "zod";
import { getCsrfToken, useAuthData } from '@riavzon/auth-h3client/client';
import type { FormSubmitEvent } from "@nuxt/ui";
import { loginSchema, signUpSchema, resetPassword } from '~~/shared/types/auth';

type LoginSchema = z.infer<typeof loginSchema>
type SignupSchema = z.infer<typeof signUpSchema>
type ResetPass = z.infer<typeof resetPassword>

export async function onSendAuth(payload: FormSubmitEvent<LoginSchema | SignupSchema | ResetPass>, type: 'login' | 'signup' | 'forgot-password') { 
  const token = getCsrfToken();
  const headers = useRequestHeaders();

 if(!token) {
    return {
        ok: false,
        date: new Date().toISOString(),
        reason: 'Server error'
    };
 }

 if (type === 'forgot-password') {
        const res = await $fetch.raw<PasswordResetResponse>(`/api/auth/password-reset`, {
            method: 'POST',
            credentials: 'include',
            body: payload,
            headers: {
                ...headers,
                'Accept': 'application/json',
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
            ignoreResponseError: true
        });

        const json = res._data;  
        if (res.status === 429) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'To many requests. try again later'
            };
        }

        if (res.status === 403 || res.status === 400) {
             return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Invalid email'
            };
        }
        if (res.status === 500) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Server error. please try again later'
            };   
        }

        if ((res.status === 200 || res.status === 201) && json && 'ans' in json) {
            return {
                ok: true,
                date: new Date().toISOString(),
                data: json.ans
            };
        }   

        else {
            return {
                ok: false,
                date: new Date().toISOString(),     
                reason: 'Server error. please try again later'
            };
        }

 }

 else if(type === 'signup') {
        const signupPayload = payload as FormSubmitEvent<SignupSchema>;
        const data = {
            name:`${signupPayload.data.firstname} ${signupPayload.data.lastname}`,
            email: signupPayload.data.email,
            password: signupPayload.data.password,
            confirmedPassword: signupPayload.data.confirmedPassword,
            termsConsent: "on",
            rememberUser: "on"
        };
        const res = await $fetch.raw<PasswordResetResponse>(`/signup`, {
            method: 'POST',
            credentials: 'include',
            body: data,
            headers: {
                ...headers,
                'Accept': 'application/json',
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
            ignoreResponseError: true
        });

        const json = res._data;  

        if (res.status === 400 || res.status === 409) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'missing required fields'
            };
        }
        if (res.status === 403 || res.status === 429) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Please try again later'
            }; 
        }
        if (res.status === 500) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Server error Please try again later'
            };
        }

        if (res.status === 201 && json && 'redirectTo' in json) {
             return {
                ok: true,
                date: new Date().toISOString(),
                data: json.redirectTo,
            };           
        }
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Server error Please try again later'
            };
 }

   else {
        const res = await $fetch.raw<ResponseFromServiceLogin>(`/login`, {
            method: 'POST',
            credentials: 'include',
            body: payload,
            headers: {
                ...headers,
                'Accept': 'application/json',
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
            ignoreResponseError: true
        });

        const json = res._data;  
        const errMSg = json && "error" in json ? json.error : undefined;

        if (errMSg) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: errMSg
            };
        }

        if (res.status === 400 || res.status === 401 || res.status === 403) {
           return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Invalid email or password'
            };   
        }

        if (res.status !== 200) {
            if (json) {
                const errMsgs = "error" in json && typeof json.error === 'string' ? json.error : 
                            "message" in json ? json.message : 
                            'Unknown error';

                if (res.status === 500) {
                  return {
                        ok: false,
                        date: new Date().toISOString(),
                        reason: 'Server error. please try again later'
                  };   
                }
                else {
                  return {
                        ok: false,
                        date: new Date().toISOString(),
                        reason: errMSg === "true" ? 'Invalid password or email' : errMsgs
                  };   
                }
            }
        }

  const auth = await useAuthData();

  if (auth.value && auth.value.mfaRequired && !auth.value.authorized) {
    return {
        ok: false,
        date: new Date().toISOString(),
        reason: auth.value.message ?? 'Multi factor authentication is required. Please check your email to continue.'
     };   
  }

  const redirectTo = json && "redirectTo" in json ? json.redirectTo : undefined;
  
  if (!redirectTo) {
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Server error. please try again later'
        };   
  }
  
  return {
      ok: true,
      date: new Date().toISOString(),
      data: redirectTo
  };
} 

}