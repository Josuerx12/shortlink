import z from "zod";
import { pt } from "zod/v4/locales";

z.config(pt());

const LinkSchema = z.object({
  originalUrl: z.url(),
});

export type LinkInputProps = z.infer<typeof LinkSchema>;

export { LinkSchema };

export interface Link extends z.infer<typeof LinkSchema> {
  id: string;
  shortCode: string;
  visitsCount: 4;
  stats?: unknown;
  createdAt: string;
  updatedAt: string;
}
