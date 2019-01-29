import path from "path";
var fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
export async function sqlData(deviceInformation) {
  const dbPath = path.resolve(
    `${__dirname}/public/${deviceInformation.deviceId}.db`
  );
  let response= `http://localhost:8086/public/${deviceInformation.deviceId}.db`
  let db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the sqlite database.");
    }
  );
  db.serialize(() => {
    // Queries scheduled here will be serialized.

    db.run("CREATE TABLE IF NOT EXISTS device(deviceId text,info text)");
    db.run(
      `INSERT INTO device VALUES(?, ?)`,
      [deviceInformation._id, JSON.stringify(deviceInformation)],
      function(err) {
        if (err) {
          return console.log(err.message);
        }

        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    );
  });
  db.close(err => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
  return response;
}
