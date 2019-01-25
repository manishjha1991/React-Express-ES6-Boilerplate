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
const fileUpload = require('express-fileupload');
let app = express();

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
	hot:true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true 
}));
app.use(webpackHotMiddleware(compiler));
app.use(fileUpload());
app.get('/home', (req,res) => {
	res.sendFile(path.join(__dirname,'./index.html'));
});


app.use(cors());
app.use(busboy());
app.use('/public', express.static(__dirname + '/public'));
app.post('/upload', (req, res, next) => {
	console.log(req);
	let imageFile = req.files.file;
  
	imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
	  if (err) {
		return res.status(500).send(err);
	  }
  
	  res.json({file: `public/${req.body.filename}.jpg`});
	});
  
  })

const isProduction = getEnv("NODE_ENV") === "production";

app.use(createRouter());

http
  .createServer(app)
  .listen(3000, () => console.log(`Listening on port ${3000}`));




// import {post} from "./utils/action"


