import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as storeSchema } from "../schemas/store.schema";

export default class StoreModel extends BaseModel {
  constructor(connection) {
    super("Store", connection);
    this.schema = storeSchema;
    this.name = "Store";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(storeInformation) {
    try {
      const store = await this.model.create(storeInformation);
      if (!store) {
        return null;
      }

      return store._doc;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async get() {
    try {
      const stores = await this.model.find({
        isActive: true
      });
      return stores;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getByStoreId(storeId) {
    try {
      const stores = await this.model.find({
        storeId: storeId,
        isActive: true
      });
      return stores;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getById(circleId) {
    try {
      const store = await this.model
        .find({
          circleId: circleId,
          isActive: true
        })
        .sort({ createdAt: -1 });
      return store;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async put(storeId, storeInformation) {
    try {
      console.log("storeInformation",storeInformation)
      let selectedApps = [];
      await this.model.updateMany(
        { storeId: storeId },
        { $set: { selectedApps } }
      );
      let store = await this.model.updateMany(
        { storeId: storeId },
        { $set: storeInformation }
      );
      return store;
    } catch (error) {
      throw error;
    }
  }

  async updateStoreByCenter(centerId, storeInformation) {
    try {
      let selectedApps = [];
      await this.model.updateMany(
        { centerId: centerId },
        { $set: { selectedApps } }
      );
      let store = await this.model.updateMany(
        { centerId: centerId },
        { $set: storeInformation }
      );
      return store;
    } catch (error) {
      throw error;
    }
  }
  async updateStoreByCircle(circleId, storeInformation) {
    try {
      let selectedApps = [];
      await this.model.updateMany(
        { circleId: circleId },
        { $set: { selectedApps } }
      );
      let store = await this.model.updateMany(
        { circleId: circleId },
        { $set: storeInformation }
      );
      return store;
    } catch (error) {
      throw error;
    }
  }
}
