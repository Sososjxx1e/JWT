import express from "express";
import homecontroller from "../controller/homeController";
const router = express.Router();

/**
 *
 * @param {*} app express-app
 */
const initWebRoutes = (app) => {
  router.get("/", homecontroller.handleHelloworld);
  router.get("/about", homecontroller.handleUserPage);
  router.post("/users/create-actions", homecontroller.handleCreateUser);
  router.post("/deleteuser/:ID", homecontroller.handledeleteUser);
  router.get("/updateuser/:ID", homecontroller.handleupdate);
  router.post("/users/user-update", homecontroller.handleupdateUser);
  return app.use("/", router);
};

export default initWebRoutes;
