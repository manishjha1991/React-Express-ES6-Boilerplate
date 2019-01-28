import { route } from ".";
import CircleModel from "../db/CircleModel";
import { ApplicationError } from "../lib/errors";


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


