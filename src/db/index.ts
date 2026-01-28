import mysql from "mysql2";
import dbConfig from "../config/db.config";

const connection = mysql.createConnection({
  host: dbConfig.HOST,          // can keep 'localhost'
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect(error => {
  if (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
  console.log("Successfully connected to the database.");
});

export default connection;