import mongoose from "mongoose";
import Store from "../../schemas/store.schema";
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
    configurationFile[process.env["NODE_ENV"]].mongoUrl,
  options,
    async err => {
      if (err) {
        throw err;
      }
    }
  );
  const jsonPath = path.join(__dirname, "stores.csv");
 const storeModel = await connection.model("Store", Store);
 const circleModel = await connection.model("Circle", Circle);
fs.readFile(jsonPath, (err, fileData) => {

 parse(fileData, { trim: true }, (err, rows) => {
    console.log(err) 
  let circleName;
   _.each(rows, async row => {
    if (row[0] == "") {
        circleName = row[1];
      }
       await circleModel.find({circleName:circleName},{circleId:1})
 });
 });
});
});


test("Seed Center", () => {
  expect(true).toBe(true);
});