import { route } from ".";
import GroupModel from "../db/GroupModel";
import { ApplicationError } from "../lib/errors";
export const get = route(async (req, res) => {
  const groupModel = new GroupModel();
  try {
    const group = await groupModel.get();
    res.send({ results: group });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const getById = route(async (req, res) => {
  const groupModel = new GroupModel();
  try {
    const groupId=req.params.Id;
    const group = await groupModel.getById(groupId);
    res.send({ results: group });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

