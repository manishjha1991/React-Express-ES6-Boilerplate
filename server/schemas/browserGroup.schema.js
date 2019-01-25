import mongoose from "mongoose";
import uuid from "uuid";
const BrowserGroup = new mongoose.Schema(
  {
    browserGroupId: { type: String, default: null },
    browserGroupName: { type: String, default: null },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default BrowserGroup;
