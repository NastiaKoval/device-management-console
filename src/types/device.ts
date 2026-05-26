import { z } from 'zod';

export const DeviceSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(60),
  status: z.enum(['online', 'offline', 'degraded']),
  ipAddress: z.string().ip({ version: 'v4' }),
  portRange: z.tuple([z.number().int().min(1).max(65535), z.number().int().min(1).max(65535)])
    .refine(([min, max]) => min < max, { message: 'min must be less than max' }),
  lastSeenAt: z.string().datetime(),
  tags: z.array(z.string().min(1).max(20).regex(/^[a-z]+$/)).max(10),
  notes: z.string().max(500).optional(),
});

export type Device = z.infer<typeof DeviceSchema>

// Form-specific schema (id/lastSeenAt are not user-editable)
export const DeviceFormSchema = DeviceSchema.omit({ id: true, lastSeenAt: true });
export type DeviceFormValues = z.infer<typeof DeviceFormSchema>
