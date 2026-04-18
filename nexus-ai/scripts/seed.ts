import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import  connectDB  from "../lib/mongoose";
import { Project } from "../models/project/project";
import { User } from "../models/user/user";
import { ProductInstance } from "../models/product/productInstance";
import { AdminConfig } from "../models/admin/adminDashboard";

async function seed() {
  try {
    await connectDB();

    // Clear existing data (optional but recommended)
    await Project.deleteMany({});
    await User.deleteMany({});
    await ProductInstance.deleteMany({});
    await AdminConfig.deleteMany({});

    // Create Project
    const project = await Project.create({
      name: "Demo Project",
      slug: "demo-project",
    });

    // Create Admin User
    const user = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      projectRoles: [
        { projectId: project._id, role: "admin" },
      ],
    });

    // Create Product Instance
    await ProductInstance.create({
      projectId: project._id,
      name: "AI Sales Assistant",
      productType: "sales-ai",
      integrations: {
        shopify: true,
        crm: true,
      },
    });

    // Create Admin Dashboard Config
    await AdminConfig.create({
      projectId: project._id,
      layout: [
        {
    type: "text_block",
    title: "Welcome",
    content: "This is your AI dashboard 🚀",
  },
  {
    type: "stats_card",
    title: "Total Conversations",
    dataKey: "totalConversations",
  },
  {
    type: "integration_status",
    title: "Integrations",
  }
      ],
    });

    console.log("🌱 Seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();