const express = require("express");
const router = express.Router();
const database = require("../../db/connection");

const inputCheck = require("../../utils/inputCheck");

// !get all voters
router.get("/voters", (req, res) => {
  //   const sql = "SELECT * FROM voters";
  const sql = `SELECT * FROM voters ORDER BY last_name`;

  database.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: rows });
  });
});

// !get voter by ID
router.get("/voter/:id", (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`;
  const params = [req.params.id];

  database.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: row });
  });
});

//! POST/CREATE a voter
router.post("/voter", ({ body }, res) => {
  // check for errors and user inputs
  const errors = inputCheck(body, "first_name", "last_name", "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.email];

  database.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

//! DELETE a voter by id
router.delete("/voter/:id", (req, res) => {
  const sql = `DELETE FROM voters WHERE id = ?`;

  database.query(sql, req.params.id, (err, result) => {
    //   random error?
    if (err) {
      res.status(400).json({ error: res.message });

      //   else if user put wrong entry/id
    } else if (!result.affectedRows) {
      res.json({ message: "Voter not found!" });
      //   else, it worked, send success
    } else {
      res.json({
        message: "Voter Deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;
