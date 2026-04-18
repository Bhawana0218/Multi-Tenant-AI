import { Project } from "@/models/project/project";
import { AdminConfig } from "@/models/admin/adminDashboard";
import { ProductInstance } from "@/models/product/productInstance";

export async function getAdminDashboard({
  user,
  projectSlug,
}: {
  user: any;
  projectSlug: string;
}) {
  //  Find project
  const project = await Project.findOne({ slug: projectSlug });

  if (!project) {
    throw new Error("Project not found");
  }

  //  Admin check
  const isAdmin = user.projectRoles.some(
    (r: any) =>
      r.projectId.toString() === project._id.toString() &&
      r.role === "admin"
  );

  if (!isAdmin) {
    throw new Error("FORBIDDEN");
  }

  // Load config
  const config = await AdminConfig.findOne({
    projectId: project._id,
  });

  // Load integrations
  const product = await ProductInstance.findOne({
    projectId: project._id,
  });

  return {
    config,
    data: {
      totalConversations: 12, // mock for now
    },
    integrations: product?.integrations || {
      shopify: false,
      crm: false,
    },
  };
}