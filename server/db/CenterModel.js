import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as centerSchema } from "../schemas/center.schema";

export default class CenterModel extends BaseModel {
  constructor(connection) {
    super("Center", connection);
    this.schema = centerSchema;
    this.name = "Center";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(centerInformation) {
    try {
      const center = await this.model.create(centerInformation);
      if (!center) {
        return null;
      }

      return center._doc;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async get() {
    try {
      const centers = await this.model.find({
        isActive: true
      });
      return centers;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getById(centerId) {
    try {
      const center = await this.model
        .find({
          _id: centerId,
          isActive: true
        })
        .sort({ createdAt: -1 })
      return center;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async put(centerId, centerInformation) {
    try {
      const center = await this.model.findOneAndUpdate(
        { _id: centerId, isActive: true },
        { $set: centerInformation },
        { new: true }
      );
      return center;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
