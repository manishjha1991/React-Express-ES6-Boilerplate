import mongoose from "mongoose";
import uuid from "uuid";
const Browser = new mongoose.Schema(
  {
    browserId: { type: String, default: null },
    browserName: { type: String, default: null },
    browserGroupId: { type: Number, default: null },
    browserLink: { type: String, default: null },
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
export default Browser;