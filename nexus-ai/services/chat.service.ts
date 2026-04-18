import  connectDB  from "../lib/mongoose";
import { getProjectBySlug } from "./project.service";
import { ProductInstance } from "../models/product/productInstance";
import { Conversation } from "../models/chat/conversation";
import { Message } from "../models/chat/message";
import { canAccessProject } from "../access/projectAccess";
import { callAI } from "@/lib/ai";


export async function sendMessageService({
  user,
  projectSlug,
  message
}: {
  user: any;
  projectSlug: string;
  message: string;
}) {
  await connectDB();

  // 1. Get Project
  const project = await getProjectBySlug(projectSlug);

  if (!project) throw new Error("Project not found");

  // 2. Authorization
  if (!canAccessProject(user, project._id)) {
    throw new Error("Unauthorized");
  }

  // 3. Product Instance
  const product = await ProductInstance.findOne({
    projectId: project._id
  });

  if (!product) throw new Error("Product not found");

  // 4. Create conversation
  const conversation = await Conversation.create({
    projectId: project._id,
    productInstanceId: product._id,
    title: message.slice(0, 20),
    createdBy: user._id
  });

  // 5. Save user message
  const userMsg = await Message.create({
    conversationId: conversation._id,
    role: "user",
    content: message
  });

  // 6. Controlled AI context
  let context = "You are an AI assistant.\n";

  if (product.integrations.shopify) {
    context += "Shopify: Orders increased by 20%.\n";
  }

  if (product.integrations.crm) {
    context += "CRM: 5 new leads added today.\n";
  }

  // 7. Call AI
  const aiResponse = await callAI(message, context);

  // 8. Save AI message
  const aiMsg = await Message.create({
    conversationId: conversation._id,
    role: "assistant",
    content: aiResponse,
    steps: ["Analyzing query", "Fetching integrations", "Generating response"]
  });

  // FIXED RESPONSE FORMAT
  return {
    conversationId: conversation._id,
    messages: [
      {
        role: "user",
        content: userMsg.content
      },
      {
        role: "assistant",
        content: aiMsg.content,
        steps: aiMsg.steps
      }
    ]
  };
}