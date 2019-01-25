import mongoose from "mongoose";
import Group from "../../schemas/group.schema";
import fs from "fs";
import path from "path";
import parse from "csv-parse";
import _ from "lodash";
import { configurationFile } from "../../lib/config";

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
  const jsonPath = path.join(__dirname, "groups.csv");
  const groupModel = await connection.model("Group", Group);
  fs.readFile(jsonPath, (err, fileData) => {
    console.log("err1", err);
    parse(fileData, { trim: true }, (err, rows) => {
      console.log("err12", err);
      let groupId, groupName;
      _.each(rows, async row => {
        // groupId = row[0];
        groupName = row[1];
        if (row[0] !== "") {
          groupId = Number.parseInt(row[0]);
          let insertingInformation = {
            groupId: groupId,
            groupName: groupName,
            isActive: true
          };
          await groupModel.findOneAndUpdate(
            {
              groupId
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
