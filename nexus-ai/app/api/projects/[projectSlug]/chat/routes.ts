import { NextRequest, NextResponse } from 'next/server';
import  dbConnect  from '@/lib/mongoose';
import { chatService } from '@/services/chat.service';
import { ProjectModel } from '@/models';

// Mock auth extraction
function getCurrentUser(req: NextRequest) {
  const cookie = req.cookies.get('user_session');
  return { id: cookie?.value || 'demo-user', role: 'admin' };
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const project = await ProjectModel.findOne({ slug: params.slug });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const user = getCurrentUser(req);
    const data = await req.json();
    const result = await chatService.processChat({ ...data, projectId: project._id.toString() }, user.id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: err.status || 500 });
  }
}