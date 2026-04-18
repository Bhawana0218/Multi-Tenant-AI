import { z } from 'zod';

export const ChatInputSchema = z.object({
  projectId: z.string().min(1),
  conversationId: z.string().optional(),
  message: z.string().min(1).max(2000),
});

export const ProjectAccessSchema = z.object({
  projectId: z.string(),
  userId: z.string(),
  role: z.enum(['admin', 'member']).optional(),
});

export const DashboardConfigUpdateSchema = z.object({
  projectId: z.string(),
  layout: z.array(z.object({ id: z.string(), type: z.string(), title: z.string(), cols: z.number(), order: z.number() })),
  widgets: z.array(z.object({ id: z.string(), type: z.string(), title: z.string(), config: z.any() })),
});