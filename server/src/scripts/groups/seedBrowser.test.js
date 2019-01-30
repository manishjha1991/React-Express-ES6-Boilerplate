import mongoose from "mongoose";
import Browser from "../../../schemas/browser.schema";
import fs from "fs";
import uuid from "uuid";
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
  const jsonPath = path.join(__dirname, "browser.csv");
  const browserModel = await connection.model("Browser", Browser);
  fs.readFile(jsonPath, (err, fileData) => {
    console.log("err1", err);
    parse(fileData, { trim: true }, (err, rows) => {
      console.log("err12", err);
      let browserId, browserName, browserGroupId, browserGroupName, browserLink,mdmId;
      _.each(rows, async row => {
        if (row[1].indexOf("||") > -1) {
          browserGroupName = row[1].split("||")[0];
          browserGroupId = row[1].split("||")[1];
        }
        browserId = row[0];
        browserName = row[1];
        browserLink = row[2];
        mdmId=row[3];
        if (browserId !== "") {
          browserId = Number.parseInt(browserId);
          let insertingInformation = {
            _id:mdmId,
            browserId: browserId,
            browserName: browserName.trim(),
            browserGroupId: browserGroupId,
            browserGroupName: browserGroupName.trim(),
            browserLink: browserLink,
            isActive: true
          };
          await browserModel.findOneAndUpdate(
            {
              _id:mdmId
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
