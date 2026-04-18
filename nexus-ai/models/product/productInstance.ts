import mongoose, { Schema, models, model } from "mongoose";

const ProductInstanceSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    productType: {
      type: String,
      enum: ["sales-ai"],
      default: "sales-ai",
    },

    integrations: {
      shopify: {
        type: Boolean,
        default: false,
      },
      crm: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const ProductInstance =
  models.ProductInstance ||
  model("ProductInstance", ProductInstanceSchema);