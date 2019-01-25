import mongoose from "mongoose";
import uuid from "uuid";
import validator from "validator";
import * as constants from "../lib/constant";

const User = new mongoose.Schema(
  {
    userId: { type: String, default: uuid.v1 },
    email: {
      type: String,
      validate: {
        validator: v => validator.isEmail(v)
      },
      message: "{VALUE} is not a valid email",
      required: true
    },

    phoneNumber: {
      type: String,
      default: true
    },

    userType: {
      type: String,
      enum: [constants.AGENT, constants.USER],
      default: constants.USER,
      required: true
    },
    statusFlag: {
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

export default User;
