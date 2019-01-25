import mongoose from "mongoose";
import uuid from "uuid";
const Center = new mongoose.Schema(
  {
    centerId: { type: String, default: null },
    centerName: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);

export default Center;
