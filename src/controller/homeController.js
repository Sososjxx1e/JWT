const { json } = require("body-parser");
import mysql from "mysql2";

// get the client

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloworld = (req, res) => {
  const name = "viettran";
  return res.render("home.ejs");
};
const handleUserPage = (req, res) => {
  //model  => get data from database
  return res.render("user.ejs");
};
const handleCreateUser = (req, res) => {
  let user = req.body.user;
  let email = req.body.email;
  let password = req.body.password;

  connection.query(
    "insert into users (email,password,username) values (?,?,?)",
    [email, password, user],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log(results); // results contains rows returned by server
    }
  );
  return res.send("handleCreateUser ");
};

module.exports = {
  handleHelloworld,
  handleCreateUser,
  handleUserPage,
};
