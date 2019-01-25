import mongoose from "mongoose";
import uuid from "uuid";
const Store = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v1 },
    storeId: { type: String, default: null },
    centerId: { type: String, default: null },
    circleId: { type: String, default: null },
    groupName: { type: String, default: null },
    olmId: { type: String, default: null },
    screenSaver: {
      appId: { type: String, default: uuid.v1 },
      videoLink: String,
      isActive: { type: Boolean, default: true }
    },
    wallpaper: {
      appId: { type: String, default: uuid.v1 },
      imageLink: String,
      isActive: { type: Boolean, default: true }
    },
    selectedApps: {
      type: Array,
      default: []
    },
    selectedBrowser: {
      type: Array,
      default: []
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

export default Store;
