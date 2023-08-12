import bcrypt, { hash } from "bcryptjs";

import mysql from "mysql2/promise";
import Bluebird from "bluebird";
import db from "../../server/models/index";

var salt = bcrypt.genSaltSync(10);

const hashPassWordUser = (usersPassword) => {
  let hashPassWord = bcrypt.hashSync(usersPassword, salt);
  return hashPassWord;
};
const createNewUser = async (email, password, user) => {
  let hasspass = hashPassWordUser(password);
  try {
    await db.User.create({
      username: user,
      password: hasspass,
      email: email,
    });
    console.log();
  } catch (e) {
    console.log(e);
  }
};
const getUserList = async () => {
  let user = [];
  user = await db.User.findAll();
  return user;
};

const getUserbyID = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return (user = user.get({ plain: true }));
};
const deleteUser = async (id) => {
  await db.User.destroy({
    where: { id: id },
  });
};
const handleupdateUserByID = async (email, user, id) => {
  await db.User.update(
    { username: user, email: email },
    {
      where: { id: id },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserbyID,
  handleupdateUserByID,
};
