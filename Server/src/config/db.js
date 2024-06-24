import mysql from "mysql";

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "13175",
  database: "market_place",
});

export default connectDB;
