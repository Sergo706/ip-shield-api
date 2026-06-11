import * as z from 'zod';

export const contactSchema = z.object({
  email: z.email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  subject: z.string().min(5, 'Subject must be at least 5 characters long'),
  fullname: z.string().min(3, 'Name must be at least 3 characters long'),
  token: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;