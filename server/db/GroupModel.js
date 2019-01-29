import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as groupSchema } from "../schemas/group.schema";

export default class CenterModel extends BaseModel {
  constructor(connection) {
    super("Group", connection);
    this.schema = groupSchema;
    this.name = "Group";
    this.model = this.connection.model(this.name, this.schema);
  }
  async get() {
    try {
      const groups = await this.model.find({}, { groupName: 1 });
      return groups;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getByCircleName(name) {
    try {
      const groups = await this.model.find({ groupName: name });
      return groups;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getById(groupId) {
    try {
      const groups = await this.model.find({ groupId: groupId });
      return groups;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
