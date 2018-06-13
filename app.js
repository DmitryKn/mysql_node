const express = require('express');
const app = express();
const faker = require('faker');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//DB config
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
//APP CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//ROUTES
app.get("/", (req, res) => {
  var q = "SELECT COUNT(*) AS count FROM users;";
  con.query(q, (err, result) => {
    if(err) throw err;
    var count = result[0].count;
    //res.send("We have " + count + " users in our database.")
    res.render('home.ejs', {data: count})
  })
})
app.post('/register',(req, res)=>{
  var person = {email: req.body.email} //store post body.
  con.query("INSERT INTO users SET ?", person, (err, result) => {
    if(err) throw error;
    console.log(result);
  res.redirect('/')
  })
})

//APP listen
app.listen(3000, () => {
  console.log("Server started. Port 3000");
})
