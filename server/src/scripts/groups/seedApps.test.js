import mongoose from "mongoose";
import App from "../../../schemas/app.schema";
import fs from "fs";
import path from "path";
import parse from "csv-parse";
import _ from "lodash";


const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true
};

beforeEach(async () => {
  let connection = await mongoose.connect(
    "mongodb://localhost:27017/db_mdm_app",
    options,
    async err => {
      if (err) {
        throw err;
      }
    }
  );
  const jsonPath = path.join(__dirname, "app.csv");
  const appModel = await connection.model("App", App);
  fs.readFile(jsonPath, (err, fileData) => {
    console.log("err1", err);
    parse(fileData, { trim: true }, (err, rows) => {
      console.log("err12", err);
      let appId, appName, groupId, groupName, appLink,isPlayStore;
      _.each(rows, async row => {
        if (row[1].indexOf("||") > -1) {
          groupName = row[1].split("||")[0];
          groupId = row[1].split("||")[1];
        }
        appId = row[0];
        appName = row[1];
        appLink = row[2];
        isPlayStore=row[3];
        if (appId !== "") {
          appId = Number.parseInt(appId);
          let insertingInformation = {
            appId: appId,
            appName: appName.trim(),
            groupId: groupId,
            groupName: groupName.trim(),
            appLink: appLink,
            isPlayStore:isPlayStore,
            isActive: true
          };
          await appModel.findOneAndUpdate(
            {
              appId
            },
            insertingInformation,
            { upsert: true }
          );
        }
      });
    });
  });
});

test("Seed Circle", () => {
  expect(true).toBe(true);
});
