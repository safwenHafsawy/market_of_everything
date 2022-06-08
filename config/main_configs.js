"use strict";

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

module.exports = {
	PORT: process.env.PORT,
	DB_URI: process.env.MONGO_URI,
	SESSION_SECRET: process.env.SESSION_SECRET,
	USERMAIL: process.env.USERMAIL,
	EMAILPW: process.env.EMAILPW,
};
