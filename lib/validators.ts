import * as z from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  nif: z
    .string()
    .min(9, "NIF must be at least 9 characters")
    .max(9, "NIF must be exactly 9 characters")
    .regex(/^[0-9]{8}[A-Z]$/, "Invalid NIF format"),
  email: z.string().email("Please enter a valid email address"),
});

export const cardSelectionSchema = z.object({
  cardId: z.string(),
  value: z.number().min(10),
  quantity: z.number().min(1),
});

export type UserValidationSchema = z.infer<typeof userValidationSchema>;
export type CardSelectionSchema = z.infer<typeof cardSelectionSchema>;