import { IProject } from '@/models';

type AccessResult = { allowed: boolean; reason?: string };

export function canAccessProject(project: IProject, userId: string, requiredRole?: 'admin' | 'member'): AccessResult {
  const member = project.members.find(m => m.userId === userId) || project.owner === userId ? { role: project.owner === userId ? 'admin' : 'member' } : null;
  if (!member) return { allowed: false, reason: 'USER_NOT_IN_PROJECT' };
  if (requiredRole === 'admin' && member.role !== 'admin') return { allowed: false, reason: 'INSUFFICIENT_ROLE' };
  return { allowed: true };
}

export function canUseIntegration(project: IProject, integration: 'shopify' | 'crm'): AccessResult {
  if (!project.activeIntegrations.includes(integration)) return { allowed: false, reason: `INTEGRATION_${integration.toUpperCase()}_DISABLED` };
  return { allowed: true };
}
