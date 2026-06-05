import z from "zod";
import { validateZodSchema } from "@riavzon/utils";
import type { PinoLogger } from "./PinoLogger";
import type { H3Event } from "h3";

export const ipv4 = z.object({ input: z.ipv4('Invalid ip address') });
export const email = z.object({ input: z.email('Invalid email address') });
export const useragent = z.object({ input: z.string('User agent needs to be a string') });

export type Ipv4Type = z.infer<typeof ipv4>;
export type UserAgentType = z.infer<typeof useragent>;
export type EmailType = z.infer<typeof email>;

export const validateIp = (event: H3Event, input: Ipv4Type, log: PinoLogger) => {
    const validation = validateZodSchema(ipv4, input, log);
    if ('valid' in validation) {
          setResponseStatus(event, 400);
          return {
              ok: false,
              date: new Date().toISOString(),
              reason: JSON.stringify(validation.errors)
          };
        }
        return validation.data.input;
};



export const validateUserAgent = (event: H3Event, input: UserAgentType, log: PinoLogger) => {
    const validation = validateZodSchema(useragent, input, log);
    if ('valid' in validation) {
        setResponseStatus(event, 400);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: JSON.stringify(validation.errors)
        };
    }
    return validation.data.input;
};


export const validateEmail = (event: H3Event, input: EmailType, log: PinoLogger) => {
    const validation = validateZodSchema(email, input, log);
    if ('valid' in validation) {
        setResponseStatus(event, 400);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: JSON.stringify(validation.errors)
        };
    }
    return validation.data.input;
};