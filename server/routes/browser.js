import { route } from ".";
import BrowserModel from "../db/BrowserModel";
import { ApplicationError } from "../lib/errors";
export const getBrowserByGroup = route(async (req, res) => {
    const browserModel = new BrowserModel();
    try {
      const groupId = req.params.Id;
      const browser = await browserModel.getBrowserByGroup(groupId);
      res.send({ results: browser });
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  });
  export const get = route(async (req, res) => {
    const browserModel = new BrowserModel();
    try {
     const browser = await browserModel.get();
      res.send({ results: browser });
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  });