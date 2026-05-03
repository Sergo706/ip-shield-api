import z from 'zod';

export const dataSchema = z.object({
    code:z.string().min(7).max(7).regex(/^\d{7}$/, `Invalid or expired code`),
    email: z.string().min(10).max(80).regex(/^(?!\.)(?!.*\.\.)[A-Za-z0-9_'-.]+[A-Za-z0-9_-]@[A-Za-z][A-Za-z-]*(?:\.[A-Za-z]{1,4}){1,3}$/)
    .transform(s => s.toLowerCase()),
    newEmail: z.string().min(10).max(80).regex(/^(?!\.)(?!.*\.\.)[A-Za-z0-9_'-.]+[A-Za-z0-9_-]@[A-Za-z][A-Za-z-]*(?:\.[A-Za-z]{1,4}){1,3}$/)
    .transform(s => s.toLowerCase()),
    password: z.string().min(12).max(64).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{12,64}$/,
        `Invalid credentials`
    ),
});

export type UpdateEmailSchemaType = z.infer<typeof dataSchema> 
export type UpdateEmailSchemaTypeInput = z.input<typeof dataSchema>; 