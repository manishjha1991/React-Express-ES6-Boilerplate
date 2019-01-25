import request from "request";
export async function post(olmid) {
  var options = {
    method: "POST",
    url: "http://125.17.6.6/email2sms-web/getuserpersonaldetails",
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
    url: "http://125.16.74.160:30601/create/sendsms2",
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

  var options = {
    method: "POST",
    url: "http://125.16.74.160:30601/cnh/login",
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
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}
