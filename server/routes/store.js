import { route } from ".";
import StoreModel from "../db/StoreModel";
import { ApplicationError } from "../lib/errors";


export const getById = route(async (req, res) => {
  const storeModel = new StoreModel();
  try {
    let circleId = req.params.Id;

    const store = await storeModel.getById(circleId);
    res.send({ results: store });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const getByStoreId = route(async (req, res) => {
  const storeModel = new StoreModel();
  try {
    let storeId = req.params.Id;

    const store = await storeModel.getByStoreId(storeId);
    res.send({ results: store });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const put = route(async (req, res) => {
  const storeModel = new StoreModel();
  try {
    let storeId = req.params.Id;
    let storeInformation = req.body;
    
    const store = await storeModel.put(storeId, storeInformation);
    res.send({ results: store });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

// Update Store By Center

// If i try to update Stores By Center that means i will find all store associate with that Center and update all stores;

export const updateStoreByCenter = route(async (req, res) => {
  const storeModel = new StoreModel();
  try {
    let centerId = req.params.Id;
    let storeInformation = req.body;
    console.log(storeInformation,"wallpaper")
    const store = await storeModel.updateStoreByCenter(
      centerId,
      storeInformation
    );
    res.send({ results: store });
  } catch (error) {
    throw error;
  }
});

export const updateStoreByCircle = route(async (req, res) => {
  const storeModel = new StoreModel();
  try {
    let circleId = req.params.Id;
    let storeInformation = req.body;
    const store = await storeModel.updateStoreByCircle(
      circleId,
      storeInformation
    );
    res.send({ results: store });
  } catch (error) {
    throw error;
  }
});
