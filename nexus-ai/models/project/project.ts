import mongoose, {models, model} from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        }
    },{
        timestamps: true,
    }
);

export const Project = models.Project || model("Project", ProjectSchema);