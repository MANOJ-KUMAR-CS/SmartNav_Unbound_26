const mysql = require("mysql2/promise"); // 👈 This must be 'mysql'


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "491194",
  database: "smart-navigation",
});

console.log("IN db.config");
module.exports = pool;