import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as browserSchema } from "../schemas/browser.schema";
import {default as browserGroupSchema} from "../schemas/browserGroup.schema"

export default class BrowserModel extends BaseModel {
  constructor(connection) {
    super("Browser", connection);
    this.schema = browserSchema;
    this.name = "Browser";
    this.model = this.connection.model(this.name, this.schema);
    this.browserGroupModel = this.connection.model("BrowserGroup",browserGroupSchema)
  }
  async get() {
    try {
      const browser = await this.model.find({});
      return browser;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async post(browserInformation) {
    try {
      let { browserId, groupId } = browserInformation;
      const findBrowserId = await this.model.find({
        browserId: browserId,
        groupId: groupId
      });
      if (findBrowserId.length > 0) {
        return "This browser is Already in this Group";
      } else {
        const browser = await this.model.create(browserInformation);
        return browser;
      }
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getBrowserByGroup(groupId) {
    try {
      const browser = await this.model.find({ browserGroupId: groupId });
      return browser;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}