import { route } from ".";
import CircleModel from "../db/CircleModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const circleModel = new CircleModel();
  try {
    const circleInformation = req.body;

    const circle = await circleModel.create(circleInformation);

    res.send({ results: circle });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const get = route(async (req, res) => {
  const circleModel = new CircleModel();
  try {
    const circles = await circleModel.get();
    res.send({ results: circles });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const getCircleByCenterId = route(async (req, res) => {
  const circleModel = new CircleModel();
  try {
    const { Id } = req.params;

    const circles = await circleModel.getCircleByCenterId(Id);
    res.send({ results: circles });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getById = route(async (req, res) => {
  const circleModel = new CircleModel();
  try {
    let circleId = req.params.Id;
    const circle = await circleModel.getById(circleId);
    res.send({ results: circle });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const put = route(async (req, res) => {
  const circleModel = new CircleModel();
  try {
    let circleId = req.params.Id;
    let circleInformation = req.body.circleInformation;
    const circle = await circleModel.put(circleId, circleInformation);
    res.send({ results: circle });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
