import z from "zod";

export const form_schema = z.object({
  email: z.string().optional(),
  phone: z
    .string()
    .regex(/^\d{7,15}$/, "Invalid phone number")
    .trim()
    .optional(),
});

export type recovery_data_schema = z.infer<typeof form_schema>;
