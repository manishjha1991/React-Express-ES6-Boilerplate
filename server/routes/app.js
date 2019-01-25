import { route } from ".";
import AppModel from "../db/AppModel";
import { ApplicationError } from "../lib/errors";
export const get = route(async (req, res) => {
  const appModel = new AppModel();
  try {
    const app = await appModel.get();
    res.send({ results: app });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const post = route(async (req, res) => {
  const appModel = new AppModel();
  try {
    const appInformation = req.body;
    const app = await appModel.post(appInformation);
    res.send({ results: app });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const getAppByGroup = route(async (req, res) => {
  const appModel = new AppModel();
  try {
    const groupId = req.params.Id;
    const app = await appModel.getAppByGroup(groupId);
    res.send({ results: app });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
