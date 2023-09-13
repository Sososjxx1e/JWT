require("dotenv").config;
import jwt from "jsonwebtoken";

const nonSecurePaths = ["/", "/login", "/contact", "/account", " /group/read"];

const createJwt = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPRIRESIN });
  } catch (e) {
    console.log(e.message);
  }
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;

  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    console.log(e);
  }
  return decoded;
};
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
const checkJWTuser = (req, res, next) => {
  let cookie = req.cookies;
  let tokenFromHeader = extractToken(req);
  if ((cookie && cookie.jwt) || tokenFromHeader) {
    let token = cookie && cookie.jwt ? cookie.jwt : tokenFromHeader;

    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
      return res.sendStatus(200);
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "NOT AUTHENTICATED A USER",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "NOT AUTHENTICATED A USER",
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupwithrole[0].roles;

    let currentUrl = req.path;
    console.log("curent url", currentUrl);
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        EM: `you dont have permission to acces thí isue`,
        DT: "",
      });
    }
    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        EM: `you dont have permission to acces this isue`,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "NOT AUTHENTICATED A USER",
      DT: "",
    });
  }
};

module.exports = {
  createJwt,
  verifyToken,
  checkJWTuser,
  checkUserPermission,
};
