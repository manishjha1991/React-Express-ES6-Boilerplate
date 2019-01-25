import mongoose from "mongoose";
import uuid from "uuid";
const Circle = new mongoose.Schema(
  {
    circleId: { type: String, default: null },
    centerId: { type: String, default: null },
    circleName: { type: String, default: null },
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

export default Circle;
