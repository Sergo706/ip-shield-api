import * as z from "zod"; 

export const resetPasswordZod = z.strictObject({
  password: z.string()
    .min(12, 'Min of 12 characters')
    .max(64,'Max of 64 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{12,64}$/, `Password must be 12 characters, include one uppercase letter, one lowercase letter, one digit, and one special character.`),

    confirmedPassword: z.string()
    .min(12,'Min of 12 characters')
    .max(64,'Max of 64 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{12,64}$/, `Password must be 12 characters, include one uppercase letter, one lowercase letter, one digit, and one special character.`),

}).refine((data) => data.password === data.confirmedPassword, {
    error: "Passwords doesn't match",
    path: ["confirmedPassword"] 
});

export const codeForm = z.strictObject({
  code: z.string('Please enter a valid code').min(7).max(7)
});

export type Code = z.infer<typeof codeForm>;
export type ResetPassword = z.infer<typeof resetPasswordZod>;