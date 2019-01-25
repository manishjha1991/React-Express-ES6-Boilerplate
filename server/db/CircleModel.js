import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";
import { default as circleSchema } from "../schemas/circle.schema";

export default class CircleModel extends BaseModel {
  constructor(connection) {
    super("Circle", connection);
    this.schema = circleSchema;
    this.name = "Circle";
    this.model = this.connection.model(this.name, this.schema);
    // this.userModel = this.connection.model("User", userSchema);
    //this.commentModel = this.connection.model("Center", commentSchema);
  }
  async create(commentInformation) {
    try {
      const circle = await this.model.create(commentInformation);

      if (!circle) {
        return null;
      }

      return circle._doc;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async get() {
    try {
      const circles = await this.model.find({
        isActive: true
      });
      return circles;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getById(circleId) {
    try {
      const circle = await this.model.find({
        complainId: circleId,
        isActive: true
      });

      return circle;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getCircleByCenterId(centerId) {
    try {
      const circle = await this.model.find({
        centerId: centerId,
        isActive: true
      });

      return circle;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async put(circleId, circleInformation) {
    try {
      const circle = await this.model.findOneAndUpdate(
        { complainId: circleId, isActive: true },
        { $set: circleInformation },
        { new: true }
      );
      return circle;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
