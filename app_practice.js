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
  console.log("Connected!");
});

var data = []; //создание массива
for(var i = 0; i < 500; i ++){
    data.push([
      faker.internet.email(), //имейлы
      faker.date.past()     //время
    ])
}

var q = 'INSERT INTO users (email, created_at) VALUES ?';

con.query(q, [data], (err, result) => {
  if(err) throw error;
  console.log(result);
})

con.end();
