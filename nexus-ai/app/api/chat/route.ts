import { sendMessageService } from "@/services/chat.service";
import { User } from "@/models/user/user";
import connectDB from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { projectSlug, message } = body;

    if (!projectSlug || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // Simulated logged-in user
    const user = await User.findOne({ email: "admin@test.com" });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const result = await sendMessageService({
      user,
      projectSlug,
      message
    });

    return Response.json(result);

  } catch (error: any) {
    console.error("Chat API Error:", error);

    return Response.json(
      { error: error.message,
        stack: error.stack,
       },
      { status: 400 }
    );
  }
}