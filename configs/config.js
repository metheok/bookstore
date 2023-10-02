require("dotenv").config();

module.exports.Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  BE_PORT: process.env.PORT || 8080,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_CLUSTERNAME: process.env.DB_CLUSTERNAME,
  DB_DATABASE: process.env.DB_DATABASE,
};
