import mongoose from "mongoose";
import uuid from "uuid";
const App = new mongoose.Schema(
  {
    appId: { type: String, default: null },
    appName: { type: String, default: null },
    groupId: { type: Number, default: null },
    appLink: { type: String, default: null },
    groupName: { type: String, default: null },
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
export default App;
