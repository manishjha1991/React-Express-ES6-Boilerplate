import { route } from ".";
import DeviceModel from "../db/DeviceModel";
import { ApplicationError } from "../lib/errors";
import { success } from "../lib/buildResponse";
export const create = route(async (req, res) => {
  try {
    const deviceModel = new DeviceModel();
    const deviceInformation = req.body;
    const device = await deviceModel.create(deviceInformation);

    res.send(success(device));
  } catch (error) {
    throw error;
  }
});
export const get = route(async (req, res) => {
  const deviceModel = new DeviceModel();
  try {
    const devices = await deviceModel.get();
    res.send({ results: devices });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getById = route(async (req, res) => {
  const deviceModel = new DeviceModel();
  try {
    let deviceId = req.params.Id;
    const device = await deviceModel.getById(deviceId);
    res.send({ results: device });
  } catch (error) {
    throw error;
  }
});
export const put = route(async (req, res) => {
  const deviceModel = new DeviceModel();
  try {
    let deviceId = req.params.Id;
    let deviceInformation = req.body;
    const device = await deviceModel.put(deviceId, deviceInformation);
    res.send({ results: device });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getAllStore = route(async (req, res) => {
  const deviceModel = new DeviceModel();
  try {
    let storeId = req.params.Id;
    const storeInformation = await deviceModel.getAllStore(storeId);
    res.send({ results: storeInformation });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
