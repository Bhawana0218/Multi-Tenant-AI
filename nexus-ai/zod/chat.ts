import { z } from "zod";

export const sendMessageSchema = z.object({
  projectSlug: z.string(),
  message: z.string().min(1, "Message cannot be empty")
});