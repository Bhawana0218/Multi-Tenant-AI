import mongoose, {models, Schema, model} from "mongoose";


const LayoutSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['stats_card', "integration_status",  "text_block"],
            required: true,
        },
        title: {
            type: String,
            required: true,
            default: 'Total Conversations',
        },
        dataKey: {
            type: String,
            required: true,
            default: 'totalConversations',
        },
        content: {
            type: String, 
        },
    },
    {
        _id: false,
    }
)
const AdminDashboardSchema = new Schema(
    {
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            unique: true,
            
        },
        layout: [LayoutSchema],
    },
    {
        timestamps: true,
    }
);

export const AdminConfig = models.AdminConfig || model("AdminConfig", AdminDashboardSchema);