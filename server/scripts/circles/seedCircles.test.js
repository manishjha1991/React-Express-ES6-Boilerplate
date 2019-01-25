import mongoose from "mongoose";
import Circle from "../../schemas/circle.schema";
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
    "mongodb://localhost:27017/db_mdm_backend",
    options,
    async err => {
      if (err) {
        throw err;
      }
    }
  );
  const jsonPath = path.join(__dirname, "circles.csv");
  const circleModel = await connection.model("Circle", Circle);
  fs.readFile(jsonPath, (err, fileData) => {
    console.log("err1", err);
    parse(fileData, { trim: true }, (err, rows) => {
      console.log("err12", err);
      let centerId, circleId, circleName;
      if (rows[0][1].split("||")[1]) {
        centerId = rows[0][1].split("||")[1];
      }
      _.each(rows, async row => {
        if (row[1].indexOf("||") > -1) {
          circleId = row[1].split("||")[1];
          row[1] = row[1].split("||")[0];
        }
        circleName = row[1];
        if (row[0] !== "") {
          circleId = Number.parseInt(row[0]);
          let insertingInformation = {
            circleId: circleId,
            centerId: centerId,
            circleName: circleName,
            isActive: true
          };
          await circleModel.findOneAndUpdate(
            {
              circleId
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
