import { z } from "zod";

export const projectSchema = z.object({
  projectSlug: z.string()
});