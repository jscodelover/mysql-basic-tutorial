const express = require("express");
const mysql = require("mysql");
const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees"
});

con.connect(err => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
  let sql =
    "CREATE TABLE coders (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), role VARCHAR(255))";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

const coder = [
  [1, "demian", "demian@gmail.com", "frontend"],
  [2, "john", "john@gmail.com", "backend"],
  [3, "mark", "mark@gmail.com", "backend"],
  [4, "pete", "pete@gmail.com", "frontend"]
];

app.get("/", (req, res) => {
  res.send(
    "use /create to create a rows in table, / read to table row, /update to update in row, /delete to delete a row in a table"
  );
});

app.get("/create", function(req, res) {
  let sql = "INSERT INTO coders VALUES ?";
  con.query(sql, [coder], (err, results) => {
    if (err) throw err;

    console.log("Last insert ID:", res.insertId);
    console.log("Row inserted:" + results.affectedRows);
  });
});

app.get("/read", function(req, res) {
  let sql = "SELECT * FROM coders";
  con.query(sql, (err, rows) => {
    if (err) throw err;

    console.log("Data received from Db:\n");
    console.log(rows);
    res.send(rows);
  });
});

app.get("/update", function(req, res) {
  let sql = "UPDATE coders SET role = 'backend' WHERE id = 1 ";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});

app.get("/delete", function(req, res) {
  let sql = "DELETE FROM coders WHERE id = 4";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

app.listen(3000);
