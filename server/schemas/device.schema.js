import mongoose from "mongoose";
import uuid from "uuid";
const Device = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v1 },
    deviceId: { type: String, default: null },
    storeId: { type: String, default: null },
    sqliteDbLink: {
      dbLink: { type: String, default: null },
      appVersion: { type: String, default: 1 }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    checkNetWorkStatus:{type :Date,default:null},
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
    
  },

  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
Device.virtual("store", {
  ref: "Store",
  localField: "storeId",
  foreignField: "storeId"
});

export default Device;
