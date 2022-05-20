const express = require("express");
const router = express.Router();
const database = require("../../db/connection");

// ! get all parties route
router.get("/parties", (req, res) => {
  const sql = `SELECT * FROM parties`;

  database.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error });
      return;
    }
    res.json({ message: "success", data: rows });
  });
});

//!get party by id route
router.get("/party/:id", (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  database.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// !delete party by id
router.delete("/party/:id", (req, res) => {
  const sql = "DELETE FROM parties WHERE id = ?";
  const params = [req.params.id];

  database.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });

      //checks if anything was actually deleted
    } else if (!result.affectedRows) {
      res.json({
        message: "Party not found!",
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

module.exports = router;
