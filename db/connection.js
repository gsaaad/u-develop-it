//creating a connection via mysql2, import package
const mysql = require("mysql2");

const database = mysql.createConnection({
  host: "localhost",
  //USERNAME
  user: "root",
  //SQL PASSWORD
  password: "gsaaadMYSQL",
  database: "election",
});

module.exports = database;
