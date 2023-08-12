const { json } = require("body-parser");

import { render } from "ejs";
import Userservies from "../services/Userservies";

// get the client

const handleHelloworld = (req, res) => {
  const name = "viettran";
  return res.render("home.ejs");
};
const handleUserPage = async (req, res) => {
  //model  => get data from database
  let userList = await Userservies.getUserList();
  await Userservies.deleteUser;
  return res.render("user.ejs", { userList });
};
const handleCreateUser = (req, res) => {
  let user = req.body.user;
  let email = req.body.email;
  let password = req.body.password;
  Userservies.createNewUser(email, password, user);

  return res.redirect("/about");
};
const handledeleteUser = async (req, res) => {
  await Userservies.deleteUser(req.params.ID);
  return res.redirect("/about");
};
const handleupdate = async (req, res) => {
  let id = req.params.ID;
  let user = await Userservies.getUserbyID(id);
  let userData = user;
  // if (user && user.length > 0) {
  //   userData = user[0];
  // }
  return res.render("userupdate.ejs", { userData });
};
const handleupdateUser = async (req, res) => {
  let email = req.body.email;
  let id = req.body.id;
  let user = req.body.user;
  await Userservies.handleupdateUserByID(email, user, id);
  return res.redirect("/about");
};

module.exports = {
  handleHelloworld,
  handleCreateUser,
  handleUserPage,
  handledeleteUser,
  handleupdate,
  handleupdateUser,
};
