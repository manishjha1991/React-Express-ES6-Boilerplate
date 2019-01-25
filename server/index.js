import express from 'express';
import path from 'path';
import cors from "cors";
import forceSsl from "express-force-ssl";
import http from "http";
import fs from "fs";
import busboy from "connect-busboy";
import { getEnv } from "./lib/env";
import createRouter from "./router";
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

let app = express();

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
	hot:true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true 
}));
app.use(webpackHotMiddleware(compiler));

app.get('/home', (req,res) => {
	res.sendFile(path.join(__dirname,'./index.html'));
});


app.use(cors());
app.use(busboy());
app.use(express.static("public"));
app.route("/upload").post(function(req, res, next) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on("file", function(fieldname, file, filename) {
    console.log("Uploading: " + filename);

    //Path where image will be uploaded
    fstream = fs.createWriteStream(__dirname + "/img/" + filename);
    let pathTosendClient = __dirname + "/img/" + filename;
    file.pipe(fstream);
    fstream.on("close", function() {
      console.log("Upload Finished of " + filename);
      res.send(pathTosendClient); //where to go next
    });
  });
});

const isProduction = getEnv("NODE_ENV") === "production";

app.use(createRouter());

http
  .createServer(app)
  .listen(3000, () => console.log(`Listening on port ${3000}`));




// import {post} from "./utils/action"


