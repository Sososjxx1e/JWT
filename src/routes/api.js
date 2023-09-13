import express from "express";
import homecontroller from "../controller/homeController";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkJWTuser, checkUserPermission } from "../middleware/JWTaction";
const router = express.Router();

/**
 *
 * p
 */

const initAPIRoutes = (app) => {
  // router.all("*", checkJWTuser, checkUserPermission);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.get(
    "/user/read",
    // checkJWTuser,
    // checkUserPermission,

    userController.readUser
  );
  router.post(
    "/user/create",
    checkJWTuser,
    checkUserPermission,
    userController.createUser
  );
  router.put(
    "/user/update",
    checkJWTuser,
    checkUserPermission,
    userController.updateUser
  );
  router.delete(
    "/user/delete",
    checkJWTuser,
    checkUserPermission,
    userController.deleteUser
  );
  router.get(
    "/group/read",

    groupController.readGroup
  );
  router.get("/account", checkJWTuser, userController.getUserAccount);

  return app.use("/api/v1", router);
};

export default initAPIRoutes;
