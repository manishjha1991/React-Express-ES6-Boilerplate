import mongoose from "mongoose";
import BrowserGroup from "../../schemas/browserGroup.schema";
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
  const jsonPath = path.join(__dirname, "browserGroup.csv");
  const browserGroupModel = await connection.model(
    "BrowserGroup",
    BrowserGroup
  );
  fs.readFile(jsonPath, (err, fileData) => {
    console.log("err1", err);
    parse(fileData, { trim: true }, (err, rows) => {
      console.log("err12", err);
      let browserGroupId, browserGroupName;
      _.each(rows, async row => {
        browserGroupName = row[1];
        if (row[0] !== "") {
          browserGroupId = Number.parseInt(row[0]);
          let insertingInformation = {
            browserGroupId: browserGroupId,
            browserGroupName: browserGroupName,
            isActive: true
          };
          await browserGroupModel.findOneAndUpdate(
            {
              browserGroupId
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
