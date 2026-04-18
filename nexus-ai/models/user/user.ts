import mongoose, {Schema, models, model } from "mongoose";

const ProjectRoleSchema = new Schema(
    {
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,

        },
        role:{
            type: String,
            enum: ['admin', 'member'],
            required: true,
        },
    },
    {
        _id: false,
    }
);


const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,

        },
        projectRoles:[ProjectRoleSchema],
    },
    {
        timestamps: true,
    }
);

export const User = models.User || model("User", UserSchema);

