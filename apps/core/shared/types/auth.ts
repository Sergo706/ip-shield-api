import z from 'zod';

export const loginSchema = z.object({
  email: z.string("Please enter a valid email").min(10).max(80).regex(/^(?!\.)(?!.*\.\.)[A-Za-z0-9_'-.]+[A-Za-z0-9_-]@[A-Za-z][A-Za-z-]*(?:\.[A-Za-z]{1,4}){1,3}$/)
    .transform(s => s.toLowerCase()),
  password: z.string(`Please enter a valid password`)
    .min(12, 'Please enter a valid password')
    .max(64,'Please enter a valid password')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{12,64}$/, `Please enter a valid password`),
});


export const signUpSchema = z.strictObject({
    firstname: z.string('This field is required')
    .min(2,'Min of 2 characters')
    .max(72,'Max of 72 characters')
    .regex(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'Your name can contain only letters'),

    lastname: z.string('This field is required')
    .min(2,'Min of 2 characters')
    .max(72,'Max of 72 characters')
    .regex(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'Your name can contain only letters'),

    email: z.string("Please enter a valid email").min(10).max(80).regex(/^(?!\.)(?!.*\.\.)[A-Za-z0-9_'-.]+[A-Za-z0-9_-]@[A-Za-z][A-Za-z-]*(?:\.[A-Za-z]{1,4}){1,3}$/)
    .transform(s => s.toLowerCase()),
     
    password: z.string()
    .min(12, 'Min of 12 characters')
    .max(64,'Max of 64 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{12,64}$/, `Password must be 12 characters, include one uppercase letter, one lowercase letter, one digit, and one special character.`),

    confirmedPassword: z.string()
    .min(12,'Min of 12 characters')
    .max(64,'Max of 64 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{12,64}$/, `Password must be 12 characters, include one uppercase letter, one lowercase letter, one digit, and one special character.`),


}).refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords doesn't match",
    path: ["confirm"] 
});

export const resetPassword = z.object({
    email: z.string("Please enter a valid email").min(10).max(80).regex(/^(?!\.)(?!.*\.\.)[A-Za-z0-9_'-.]+[A-Za-z0-9_-]@[A-Za-z][A-Za-z-]*(?:\.[A-Za-z]{1,4}){1,3}$/)
    .transform(s => s.toLowerCase()),
});