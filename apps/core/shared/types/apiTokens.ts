import z from 'zod';

const ipv4ErrorMessage = 'Please make sure all ip addresses are in ipv4 format';
const ipv4AddressSchema = z.ipv4({ error: ipv4ErrorMessage });

const ipv4ListSchema = z.array(z.string()).optional().superRefine((addresses, ctx) => {
  if (!addresses?.length) return;

  const hasInvalidAddress = addresses.some((address) => !ipv4AddressSchema.safeParse(address).success);

  if (hasInvalidAddress) {
    ctx.addIssue({
      code: 'custom',
      message: ipv4ErrorMessage
    });
  }
});

export const newApiTokenSchema = z.object({
  name: z.string().min(1, 'Must be at least 1 characters').max(50, 'Max of 50 characters are allowed'),
  ipv4: ipv4ListSchema,
  prefix: z.string()
    .min(2, 'Must be at least 2 characters')
    .max(10, 'Max of 10 characters are allowed')
    .regex(/^[^_]+$/, 'Underscores are not allowed'),
  expires: z.number().optional()
});

export const ipRestrictionUpdate = z.object({
  ipv4: ipv4ListSchema,
  tokenId: z.coerce.number()
});

export type NewApiTokenInput = z.infer<typeof newApiTokenSchema>;
export type IpRestrictionUpdateInput = z.infer<typeof ipRestrictionUpdate>;