import { Project } from '../models/project/project';
import connectDB from '@/lib/mongoose';

export async function getProjectBySlug(slug: String){
    await connectDB();

    const project = await Project.findOne({ slug });

    if (!project) throw new Error("Project Not Found.");

    return project;

}