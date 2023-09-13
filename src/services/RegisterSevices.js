import Userservies from "./Userservies";
import db from "../../server/models/index";
import bcrypt, { hash } from "bcryptjs";
const { Op } = require("sequelize");
import { getGroupWithRole } from "./JWTServices";
import { createJwt } from "../middleware/JWTaction";
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);

const hashPassWordUser = (usersPassword) => {
  let hashPassWord = bcrypt.hashSync(usersPassword, salt);
  return hashPassWord;
};

const checkEmail = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};
const checkPhone = async (Phone) => {
  let userPhone = await db.User.findOne({
    where: { Phone: Phone },
  });
  if (userPhone) {
    return true;
  } else {
    return false;
  }
};
const passwordHandle = (password) => {
  let pass = hashPassWordUser(password);
  return pass;
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email phone number are exsist
    let emailExsist = await checkEmail(rawUserData.Email);
    if (emailExsist === true) {
      return {
        EM: "Email aready exsist",
        EC: 1,
      };
    }
    let phoneExsist = await checkPhone(rawUserData.Phone);
    if (phoneExsist === true) {
      return {
        EM: "phone aready exsist",
        EC: 1,
      };
    }
    //hash user password
    let pass = passwordHandle(rawUserData.Password);
    //create new user
    await db.User.create({
      email: rawUserData.Email,
      phone: rawUserData.Phone,
      password: pass,
      username: rawUserData.Username,
      groupId: 4,
    });
    return {
      EM: "create succesfully",
      EC: 0,
    };
  } catch (e) {
    return {
      EM: "somthing wrong in services",
      EC: -2,
    };
  }
};
const checkPassword = (password, hashPassWord) => {
  return bcrypt.compareSync(password, hashPassWord);
};
const handleUserLogin = async (rawUserData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawUserData.valuelogin },
          { phone: rawUserData.valuelogin },
        ],
      },
    });
    if (user) {
      let correctPassword = checkPassword(rawUserData.password, user.password);
      if (correctPassword === true) {
        console.log("found user");

        //test role
        let groupwithrole = await getGroupWithRole(user);
        let payload = {
          email: user.email,
          groupwithrole,

          username: user.username,
        };
        let token = await createJwt(payload);
        return {
          EM: "DĂNG NHẬP THÀNH CÔNG",
          EC: 0,
          DT: {
            access_token: token,
            groupwithrole,
            email: user.email,
            username: user.username,
          },
        };
      }
    }
    console.log("not found");
    return {
      EM: "email,phone or password is not correct",
      EC: -2,
      DT: "",
    };
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  checkPassword,
  checkEmail,
  checkPhone,
};
