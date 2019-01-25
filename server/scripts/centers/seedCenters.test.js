import mongoose from "mongoose";
import Center from "../../schemas/center.schema";
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
    configurationFile[process.env["NODE_ENV"]].mongoUrl,
  options,
    async err => {
      if (err) {
        throw err;
      }
    }
  );
  const jsonPath = path.join(__dirname, "centers.csv");
  const centerModel = await connection.model("Center", Center);
fs.readFile(jsonPath, (err, fileData) => {
 parse(fileData, { trim: true }, (err, rows) => {
  let centerId,centerName;
   _.each(rows, async row => {
     if (row[0] && row[1]) {
      centerId=row[0]
      centerName=row[1]
     }
    if (row[0] !== "") {
      centerId = Number.parseInt(row[0]);
    let insertingInformation = {
         centerId: centerId,
         centerName: centerName,
         isActive: true,
       };
       await centerModel.findOneAndUpdate(
        {
          centerId
        },
        insertingInformation,
        { upsert: true }
      );
     }
   });
 });
});
});


test("Seed Center", () => {
  expect(true).toBe(true);
});