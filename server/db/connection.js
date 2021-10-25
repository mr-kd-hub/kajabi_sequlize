// const mysql = require("mysql");
// const dotenv = require("dotenv");
// dotenv.config({ path: "../.env" });
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// connection.connect((err) => {
//   if (err) throw err.message;
//   console.log("Database Connected");
// });

// //console.log(`conne`, connection);

// module.exports = connection;
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("course_database", "root", "", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  // operatorsAliases: false,
});
module.exports = sequelize;
