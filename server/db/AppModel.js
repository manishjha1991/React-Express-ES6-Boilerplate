import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as appSchema } from "../schemas/app.schema";

export default class AppModel extends BaseModel {
  constructor(connection) {
    super("App", connection);
    this.schema = appSchema;
    this.name = "App";
    this.model = this.connection.model(this.name, this.schema);
  }
  async get() {
    try {
      const app = await this.model.find({});
      return app;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async post(appInformation) {
    try {
      let { appId, groupId } = appInformation;
      const findAppId = await this.model.find({
        appId: appId,
        groupId: groupId
      });
      if (findAppId.length > 0) {
        return "This app is Already in this Group";
      } else {
        const app = await this.model.create(appInformation);
        return app;
      }
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getAppByGroup(groupId) {
    try {
      const app = await this.model.find({ groupId: groupId });
      return app;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
