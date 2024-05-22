// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  timezone: 'Asia/Seoul',
  database: 'Youtube',
  dateStrings: true,
});

// simple query
connection.query('SELECT * FROM `users`', function (err, results, fields) {
  // console.log(results);
});

module.exports = connection;
