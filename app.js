const express = require('express');
const app = express();
const faker = require('faker');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "join_us"
});
con.connect(err => {
  if (err) throw err;
  console.log("DB Connected!");
});


//ROUTES
app.get("/", (req, res) => {
  var q = "SELECT COUNT(*) AS count FROM users;";
  con.query(q, (err, result) => {
    if(err) throw err;
    var count = result[0].count;
    res.send("We have " + count + " users in our database.")
  })
})

app.listen(3000, () => {
  console.log("Server started. Port 3000");
})
