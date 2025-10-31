import * as z from "zod";
import { pt } from "zod/v4/locales";

z.config(pt());

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginInputProps = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
  });

export type RegisterInputProps = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
