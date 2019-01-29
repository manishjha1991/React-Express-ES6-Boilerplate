import { route } from ".";
import DeviceModel from "../db/DeviceModel";
import StoreModel from "../db/StoreModel";
import { ApplicationError } from "../lib/errors";
import { post, sendMessageToStoreManager } from "../utils/action";
export const sendMessage = route(async (req, res) => {
  const deviceModel = new DeviceModel();
  const storeModel = new StoreModel();
  try {
    let { deviceId } = req.body;
    const getStoreInformation = await deviceModel.getById(deviceId);
    let storeId = getStoreInformation[0].storeId;
    let getOLMId = await storeModel.getByStoreId(storeId);
    let getAllInforamtionAboutStore = await post(getOLMId[0].olmId);
    console.log(getAllInforamtionAboutStore,"GET CONTACT NUMBER OF STORE MANAGER FROM BOTNY API PASSING OLM ID")
    let Message = `Battery of your device ${deviceId}  at store ${getOLMId[0].storeId} has gone below 15%. Please take action accordingly`;
    console.log(Message,"MESSAGE")
    let contactNumber = getAllInforamtionAboutStore.result.empList.mobileNo;
    let sendMessageToStore = await sendMessageToStoreManager(
      contactNumber,
      Message
    );
    res.send(sendMessageToStore);
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
