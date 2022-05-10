//require express, mysql2
const express = require("express");
const mysql = require("mysql2");

//port + app plugin
const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connecting to the sql database

const database = mysql.createConnection(
  {
    host: "localhost",

    //your MySQL username,
    user: "root",
    //your MySQL Password
    password: "Georgess222$",
    database: "election",
  },
  console.log("Connected to the election Database")
);

//query and select all items from candidates
database.query("SELECT * FROM candidates", (err, rows) => {
  //   console.log(rows[5].first_name);
  console.log(rows);
  rows.forEach((item) => console.log(item.first_name));
});

//default response for not found -> CATCH ALL
app.use((req, res) => {
  res.status(404).end();
});

//app connect
app.listen(PORT, () => {
  console.log(`Server Online~! port: ${PORT}`);
});

// here

//get route testing! --> main page, display hello world
// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World!!!!!!",
//   });
// });
