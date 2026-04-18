import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  _id: string;
  slug: string;
  name: string;
  owner: string;
  members: { userId: string; role: 'admin' | 'member' }[];
  activeIntegrations: ('shopify' | 'crm')[];
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  slug: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  members: [{ userId: String, role: { type: String, enum: ['admin', 'member'] } }],
  activeIntegrations: [{ type: String, enum: ['shopify', 'crm'] }],
}, { timestamps: true });

export interface IConversation extends Document {
  _id: string;
  projectId: string;
  userId: string;
  title: string;
  messages: { role: 'user' | 'assistant' | 'system'; content: string; step?: string }[];
  integrationContext?: Record<string, any>;
}

const ConversationSchema = new Schema<IConversation>({
  projectId: { type: String, required: true, index: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  messages: [{ role: String, content: String, step: String }],
}, { timestamps: true });

export interface IDashboardConfig extends Document {
  projectId: string;
  layout: { id: string; type: string; title: string; cols: number; order: number }[];
  widgets: { id: string; type: string; title: string; config: Record<string, any> }[];
  sections: { id: string; title: string; visible: boolean }[];
}

const DashboardConfigSchema = new Schema<IDashboardConfig>({
  projectId: { type: String, unique: true, required: true },
  layout: [{ id: String, type: String, title: String, cols: Number, order: Number }],
  widgets: [{ id: String, type: String, title: String, config: Schema.Types.Mixed }],
  sections: [{ id: String, title: String, visible: Boolean }],
});

export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export const ConversationModel = mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);
export const DashboardConfigModel = mongoose.models.DashboardConfig || mongoose.model<IDashboardConfig>('DashboardConfig', DashboardConfigSchema);
