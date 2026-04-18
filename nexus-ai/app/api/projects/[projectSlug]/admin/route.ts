import { getAdminDashboard } from "@/services/admin.service";
import connectDB from "@/lib/mongoose";
import { User } from "@/models/user/user";

export async function GET(
  req: Request,
  context: { params: Promise<{ projectSlug: string }> }
) {
  try {
    await connectDB();

    // unwrap params (NEW Next.js requirement)
    const { projectSlug } = await context.params;

    // mock user
    const user = await User.findOne({ email: "admin@test.com" });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const result = await getAdminDashboard({
      user,
      projectSlug,
    });

    return Response.json(result);

  } catch (error: any) {
    console.error("Admin API Error:", error);

    return Response.json(
      { error: error.message },
      { status: error.message === "FORBIDDEN" ? 403 : 500 }
    );
  }
}