// Defines an express app that runs the boilerplate codebase.
import multer from "multer";
import bodyParser from "body-parser";
import express from "express";
import { ApplicationError } from "./lib/errors";
import { verify as verifyMiddleware } from "./routes/sessions";

// *******************
// * FILE UPLOAD MULTER START *
// *******************

// *******************
// * FILE UPLOAD MULTER END *
// *******************

import {
  get as groupRoutes
  // getByCircleName as getByCircleNameRoutes
} from "./routes/group";

import { sendMessage as sendMessageRoutes } from "./routes/message";

import {
  create as createCenterRoutes,
  get as getCenterRoutes,
  put as updateCenterRoutes,
  getById as getByIdCenterRoutes
} from "./routes/center";

import {
  create as createCircleRoutes,
  get as getCircleRoutes,
  put as updateCircleRoutes,
  getById as getByIdCircleRoutes,
  getCircleByCenterId as getCircleByCenterIdRoutes
} from "./routes/circle";

import {
  create as createStoreRoutes,
  get as getStoreRoutes,
  put as updateStoreByStoreIdRoutes,
  getById as getStoreByCircleIdSRoutes,
  getByStoreId as getStoreByStoreIdRoutes,
  updateStoreByCenter as updateStoreByCenterRoutes,
  updateStoreByCircle as updateStoreByCircleRoutes
} from "./routes/store";

import {
  create as createDeviceRoutes,
  get as getDeviceRoutes,
  put as updateDeviceRoutes,
  getById as getByIdDeviceRoutes,
  getAllStore as getAllDeviceByStoreIdRoutes
} from "./routes/device";

//App

import {
  get as getAllAppRoutes,
  post as createAppRoutes,
  getAppByGroup as getAppByGroupIdRoutes
} from "./routes/app";

export default function createRouter() {
  // *********
  // * SETUP *
  // *********

  const router = express.Router();
  router.use(bodyParser.json()); // parse json bodies automatically

  /**
   * Uncached routes:
   * All routes that shouldn't be cached (i.e. non-static assets)
   * should have these headers to prevent 304 Unmodified cache
   * returns. This middleware applies it to all subsequently
   * defined routes.
   */
  router.get("/*", (req, res, next) => {
    res.set({
      "Last-Modified": new Date().toUTCString(),
      Expires: -1,
      "Cache-Control": "must-revalidate, private"
    });
    next();
  });

  // *****************
  // * API ENDPOINTS *
  // *****************

  /*
   * sessions endpoints
   */
  // authenticate. Returns a json web token to use with requests.
  /*
   * users endpoints
   */
  // the sessions.verify middleware ensures the user is logged in

  //

  router.post("/message", sendMessageRoutes);

  // Center Routes
  router.post("/center", createCenterRoutes);
  router.get("/center/:Id", getByIdCenterRoutes);
  router.get("/center", getCenterRoutes);
  // router.put("/center/:Id", updateCenterRoutes);

  // Circle Routes

  // router.post("/circle", createCircleRoutes);
  // router.get("/circle/:Id", getByIdCircleRoutes);
  router.get("/circle", getCircleRoutes);
  // router.put("/circle/:Id", updateCircleRoutes);
  router.get("/circle/:Id/center", getCircleByCenterIdRoutes);
  //Update Circle

  // Store Routes

  // router.post("/store", createStoreRoutes);
  router.get("/store/:Id/circle", getStoreByCircleIdSRoutes);
  // router.get("/store", getStoreRoutes);
  router.get("/store/:Id", getStoreByStoreIdRoutes);
  //>>>>>>> Update Routes//
  // NOTE ->
  //These Routes Update store data by center,circle and store
  router.put("/store/:Id/center", updateStoreByCenterRoutes);
  router.put("/store/:Id/circle", updateStoreByCircleRoutes);
  router.put("/store/:Id", updateStoreByStoreIdRoutes);

  /**
   * If you want all other routes to render something like a one-page
   * frontend app, you can do so here; else, feel free to delete
   * the following circle.
   */

 

  //Device Routes

  router.post("/device", createDeviceRoutes);
  router.get("/device/:Id", getByIdDeviceRoutes);
  router.get("/device", getDeviceRoutes);
  router.put("/device/:Id", updateDeviceRoutes);
  router.get("/store/:Id/device", getAllDeviceByStoreIdRoutes);
  // Group Routes

  router.get("/group", groupRoutes);
  // router.get("/group/:name", getByCircleNameRoutes);

  //App Routes
  router.post("/app", createAppRoutes);
  router.get("/app/:Id", getAppByGroupIdRoutes);
  router.get("/app", getAllAppRoutes);
  // ******************
  // * ERROR HANDLING *
  // ******************

  // 404 route
  router.all("/*", (req, res, next) => {
    next(new ApplicationError("Not Found", 404));
  });

  // catch all ApplicationErrors, then output proper error responses.
  //
  // NOTE: express relies on the fact the next line has 4 args in
  // the function signature to trigger it on errors. So, don't
  // remove the unused arguments!
  router.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).send({
        data: err.data || {},
        message: { errMsg: err.message, errCode: err.statusCode }
      });
      return;
    }
    // If we get here, the error could not be handled.
    // Log it for debugging purposes later.

    res.status(500).send({
      message:err
    }); // uncaught exception
  });

  // *******************
  // * CATCH ALL ROUTE *
  // *******************

  /**
   * If you want all other routes to render something like a one-page
   * frontend app, you can do so here; else, feel free to delete
   * the following circle.
   */
  /*
   * function renderFrontendApp(req, res, next) {
   *   // TODO: add code to render something here
   * }
   * // all other pages route to the frontend application.
   * router.get('/*', renderFrontendApp);
   */

  return router;
}
