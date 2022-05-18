//require express, mysql2
const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");

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

//!query and select all items from candidates
// database.query("SELECT * FROM candidates", (err, rows) => {
//   // console.log(rows[5].first_name);
//   // console.log(rows);
//   // rows.forEach((item) => console.log(item.first_name));
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });

//!query and delete by id

app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  database.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not Found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );

  if (errors) {
    res.status(400).json({ error: errors });
  }

  const sql = `INSERT INTO candidates (first_name, last_name,industry_connected)
      VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  database.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log(err);
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

//!create a candidate SQL
// const sql = `INSERT INTO candidates (id,first_name,last_name, industry_connected)
//               VALUES (?,?,?,?)`;
// const params = [14, "Ronald", "FirBank", 1];
// database.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//!get all candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;

  database.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      //return response 500 if server is faulty
      res.status(500).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//get a single candidate
app.get("/api/candidates/:id", (req, res) => {
  const sql = `SELECT *  FROM candidates WHERE id =?`;
  const params = [req.params.id];

  database.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ eroor: err.message });
      return;
    }
    res.json({ message: "success", data: row });
  });
});

// //default response for not found -> CATCH ALL

// app.use((req, res) => {
//   res.status(404).end();
// });

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
