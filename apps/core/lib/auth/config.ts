import authEnv from '../envParser';
import { githubEmailCallBack } from "./callbacks/github.callback";
import { configuration } from '@riavzon/auth-h3client/v1';
import z from 'zod';

type AuthConfiguration = Parameters<typeof configuration>[0];

const authE = z.object({
   AUTH_SERVER_LOCATION: z.string(),
   AUTH_PORT_LOCATION: z.string(),
   NODE_ENV: z.string(),
   HMAC_CLIENT_ID: z.string(),
   HMAC_SHARED_SECRET: z.string(),
   AUTH_CRYPTO_COOKIES: z.string(),
   DOMAIN: z.string(),
   OAUTH_GOOGLE_CLIENT_ID: z.string(),
   OAUTH_GOOGLE_CLIENT_SECRET: z.string(),
   OAUTH_GITHUB_CLIENT_ID: z.string(),
   OAUTH_GITHUB_CLIENT_SECRET: z.string()
});

export type AuthEnv = z.infer<typeof authE>;

const env = authEnv<AuthEnv>(authE);

export const domain = env.NODE_ENV === 'development' ? 'localhost' : env.DOMAIN;

export const authConfig: Omit<AuthConfiguration, 'uStorage'> = {
    server: {
        auth_location: {
            serverOrDNS: env.AUTH_SERVER_LOCATION,
            port: Number(env.AUTH_PORT_LOCATION)
        },
        hmac: {
            enableHmac: true as const,
            clientId: env.HMAC_CLIENT_ID,
            sharedSecret: env.HMAC_SHARED_SECRET,
        },

    ssl: {
        enableSSL: false as const,
    },
    cryptoCookiesSecret: env.AUTH_CRYPTO_COOKIES,
    },
    htmlSanitizer: {
        IrritationCount: 3,
        maxAllowedInputLength: 10_000,
    },
    imageUploader: {
        allowedBytes: 5 * 1024 * 1024,
        allowedMimes: ['image/png', 'image/jpeg', 'image/webp'],
        allowedExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
    },
    onSuccessRedirect: `https://${domain}/dashboard`,
    OAuthProviders: [{
        kind: 'oidc',
        name: 'google',
        issuer: 'https://accounts.google.com',
        clientId: env.OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: env.OAUTH_GOOGLE_CLIENT_SECRET,
        defaultScopes: ["openid","email","profile"], 
        extraAuthParams: {
            access_type: "offline",
            prompt: "consent",
            include_granted_scopes: "true"
        },
        redirectUri: `https://${domain}/oauth/callback/google`,
        supportPKCE: true,
        redirectUrlOnSuccess: `https://${domain}/dashboard`,
        redirectUrlOnError: `https://${domain}/`
    },
    {
       kind: 'oauth',
       name: 'github',
       authorizationEndpoint: 'https://github.com/login/oauth/authorize',
       tokenEndpoint: 'https://github.com/login/oauth/access_token',
       userInfoEndpoint: 'https://api.github.com/user',
       emailCallBack: githubEmailCallBack,
       clientId: env.OAUTH_GITHUB_CLIENT_ID,
       clientSecret: env.OAUTH_GITHUB_CLIENT_SECRET,
       redirectUri: `https://${domain}/oauth/callback/github`,
       defaultScopes: ['read:user', 'user:email'],
       supportPKCE: true,
       redirectUrlOnSuccess: `https://${domain}/dashboard`,
       redirectUrlOnError: `https://${domain}/`
    }
],
    magicLinkRedirectPath: '/auth/verify',
    magicLinkBouncePath: '/auth/bounce',
    enableFireWallBans: false,
    logLevel: 'debug' as const
};
