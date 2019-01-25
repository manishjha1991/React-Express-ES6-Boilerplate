import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as userSchema } from "../schemas/user.schema.js";

export default class userModel extends BaseModel {
  constructor(connection) {
    super("user", connection);
    this.schema = userSchema;
    this.name = "user";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(userInformation) {
    try {
      const user = await this.model.create(userInformation);
      if (!user) {
        return null;
      }

      return user._doc;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async get() {
    try {
      const users = await this.model.find({
        statusFlag: true
      });
      return users;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getById(userId) {
    try {
      const user = await this.model.find({
        userId: userId,
        statusFlag: true
      });
      return user;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async put(userId, userInformation) {
    try {
      const user = await this.model.findOneAndUpdate(
        { userId: userId, statusFlag: true },
        { $set: userInformation },
        { new: true }
      );
      return user;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
