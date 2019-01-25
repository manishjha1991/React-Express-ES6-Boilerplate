import { route } from ".";
import CenterModel from "../db/CenterModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const centerModel = new CenterModel();
  try {
    const centerInformation = req.body;
    const center = await centerModel.create(centerInformation);

    res.send({ results: center });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const get = route(async (req, res) => {
  const centerModel = new CenterModel();
  try {
    const center = await centerModel.get();
    res.send({ results: center });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getById = route(async (req, res) => {
  const centerModel = new CenterModel();
  try {
    let centerId = req.params.Id;
    const center = await centerModel.getById(centerId);
    res.send({ results: center });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const put = route(async (req, res) => {
  const centerModel = new CenterModel();
  try {
    let centerId = req.params.Id;
    let centerInformation = req.body;
    const center = await centerModel.put(centerId, centerInformation);
    res.send({ results: center });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
