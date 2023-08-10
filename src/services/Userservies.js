import bcrypt from "bcryptjs";

import mysql from "mysql2/promise";
import Bluebird from "bluebird";

var salt = bcrypt.genSaltSync(10);

const hashPassWordUser = (usersPassword) => {
  let hashPassWord = bcrypt.hashSync(usersPassword, salt);
  return hashPassWord;
};
const createNewUser = async (email, password, user) => {
  let hasspass = hashPassWordUser(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });

  const [rows, fields] = await connection.execute(
    "insert into users (email,password,username) values (?,?,?)",
    [email, hasspass, user]
  );
};
const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (e) {
    console.log(e);
  }
};

const getUserbyID = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "select * from users where id = ?",
      [id]
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "delete from users where id = ?",
      [id]
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
};
const handleupdateUserByID = async (email, user, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird.Promise,
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE users set email = ? ,username = ?  where id = ?",
      [email, user, id]
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserbyID,
  handleupdateUserByID,
};
