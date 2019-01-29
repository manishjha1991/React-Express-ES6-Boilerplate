import request from "request";
export async function post(olmid) {
  var options = {
    method: "POST",
    url: "http://10.5.194.81/email2sms-web/getuserpersonaldetails",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json"
    },
    body: { olmid: olmid },
    json: true
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

export async function sendMessageToStoreManager(mobilenumber, message) {
  var options = {
    method: "POST",
    url: "http://10.5.200.248:30938/create/sendsms2",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json"
    },
    body: { mobilenumber: mobilenumber, message: message },
    json: true
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        console.log(body);
        resolve(body);
      }
    });
  });
}

export async function login(deviceInformation) {
  // console.log(deviceInformation,"XYZ")
  let {
    username,
    password,
    applicationName,
    storeId,
    deviceId
  } = deviceInformation;
 console.log(username,"USER_NAME",password,"PASS_WORD",applicationName,"APPLICATION_NAME",storeId,"STORE_ID",deviceId,"DEVICE_ID")
  var options = {
    method: "POST",
    url: "http://10.5.200.248:30938/cnh/login",
    headers: {
      deviceId: deviceId,
      "cache-control": "no-cache",
      "Content-Type": "application/json"
    },
    body: {
      username: username,
      password: password,
      storeId: storeId,
      applicationName: applicationName
    },
    json: true
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        console.log(error,"ERROR WITH LOGIN FOR STORE_MANAGER")
        reject(error);
      } else {
        console.log(response,"RESPONSE FOR LOGIN");
        console.log(response,"RESPONSE FROM BODY")
        resolve(body);
      }
    });
  });
}
