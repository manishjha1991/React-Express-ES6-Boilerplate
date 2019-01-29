import async from "async";
import BaseModel from "./BaseModel";
import { login } from "../utils/action";
import { ApplicationError } from "../lib/errors";
import _ from "lodash";
import { default as deviceSchema } from "../schemas/device.schema";
import { default as appSchema } from "../schemas/app.schema";
import { default as storeSchema } from "../schemas/store.schema";
import { default as browserSchema } from "../schemas/browser.schema";
import { default as circleSchema } from "../schemas/circle.schema";
import { sqlData } from "../sqlite";
export default class DeviceModel extends BaseModel {
  constructor(connection) {
    super("Device", connection);
    this.schema = deviceSchema;
    this.name = "Device";
    this.model = this.connection.model(this.name, this.schema);
    this.browserModel = this.connection.model("Browser", browserSchema);
    this.appModel = this.connection.model("App", appSchema);
    this.storeModel = this.connection.model("Store", storeSchema);
    this.circleModel = this.connection.model("Circle", circleSchema);
  }
  async create(deviceInformation) {
    try {
      let results;
      let storemanagerLogin = await login(deviceInformation);
      console.log(storemanagerLogin,"STORE_MANAGER_INFI_WITH_LOGIN_API");
      let { groupName, olmId, centerId, deviceId } = deviceInformation;

      let deviceInformationWithStoreId = Object.assign({}, deviceInformation, {
        storeId: storemanagerLogin.result.storeid,
        circleId: storemanagerLogin.result.circleid
      });

      await this.model.findOneAndUpdate(
        { deviceId: deviceId },
        { $set: deviceInformationWithStoreId },
        { upsert: true, new: true }
      );
      let store = await this.storeModel.find({
        storeId: storemanagerLogin.result.storeid
      });
      let circle = await this.circleModel.find({
        circleId: storemanagerLogin.result.circleid
      });
      if (circle.length) {
        if (store.length) {
          results = await this.model
            .findOne({ deviceId: deviceId })
            .populate("store")
            .lean();
          await this.put(deviceId, results);
          results = await this.model
            .findOne({ deviceId: deviceId })
            .populate("store")
            .lean();
        }
      } else {
        let insertedInformationForCircle = {
          circleId: storemanagerLogin.result.circleid,
          centerId: centerId
        };
        await this.circleModel.create(insertedInformationForCircle);
        let getAppIds = await this.appModel.find(
          { groupName: groupName },
          { _id: 0, appId: 1, appName: 1, appLink: 1 ,isPlayStore:1}
        );
        let getBrowserIds = await this.browserModel.find(
          { browserGroupName: groupName },
          { _id: 0, browserId: 1, browserName: 1, browserLink: 1 }
        );

        let insertedInformationForStore = {
          storeId: storemanagerLogin.result.storeid,
          groupName: groupName,
          circleId: storemanagerLogin.result.circleid,
          centerId: centerId,
          olmId: olmId,
          selectedBrowser: getBrowserIds,
          selectedApps: getAppIds
        };
        await this.storeModel.create(insertedInformationForStore);
      }

      results = await this.model
        .findOne({ deviceId: deviceId })
        .populate("store")
        .lean();
      await this.put(deviceId, results);
      results = await this.model
        .findOne({ deviceId: deviceId })
        .populate("store")
        .lean();
      if (!results) {
        return null;
      } else {
        return results;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async get() {
    try {
      const devices = await this.model.find({
        isActive: true
      });
      return devices;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getById(deviceId) {
    try {
      console.log(deviceId);
      const device = await this.model
        .find({
          deviceId: deviceId
        })
        .sort({ createdAt: -1 });

      return device;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async getAllStore(storeId) {
    try {
      const store = await this.model
        .find({
          storeId: storeId
        })
        .sort({ createdAt: -1 });
      return store;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async put(deviceId, device) {
    try {
      // *****************
      // * SQLITE CREATE *
      // *****************
      let sqliteDb = await sqlData(device);
      // *****************
      // * SQLITE DONE *
      // *****************
      return await this.model.findOneAndUpdate(
        { deviceId: deviceId },
        { $set: { sqliteDbLink: sqliteDb } },
        { new: true }
      );
    } catch (error) {
      throw error
    }
  }
  async updateNetWorkStatusForDeviceByDeviceId(deviceId,requestTime){
    try{
      return await this.model.findOneAndUpdate(
        { deviceId: deviceId },
        { $set: { checkNetWorkStatus: requestTime } },
        { new: true }
      );
    }catch(error){
      throw error
    }
  }
}
