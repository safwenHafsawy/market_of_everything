"use strict";

const express = require("express");
const http = require("http");
const cors = require("cors");
const session = require("express-session");
const MongoSTore = require("connect-mongodb-session")(session);
const compression = require("compression");
const uuid = require("uuid").v4; //used for identifying information that needs to be unique within the system/network
const path = require("path");
const productApi = require("./api/productRoutes");
const userAPI = require("./api/userRoutes");
const mainAPI = require("./api/mainRoutes");
const { PORT, DB_URI, SESSION_SECRET } = require("./config/main_configs");
const connection = require("./config/database_config");
const passport = require("passport");

/**
 *
 * -------------- GENERAL SETUP ----------------
 */

//creating express application
const app = express();

app.use(compression()); //compresses the response body returned by the server for each request(resulting in reduced latency)
const whiteList = ["https://marketofeveyrthing.herokuapp.com/"];
app.use(
	cors({
		origin: whiteList,
		methods: "GET,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * -------------- SESSION SETUP ----------------
 */
const store = new MongoSTore({
	uri: DB_URI,
	databaseName: "marketDB",
	collection: "sessions",
});
app.set("trust proxy", 1);
app.use(
	session({
		store: store,
		secret: SESSION_SECRET,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			sameSite: false,
			secure: true,
		},
		resave: false,
		name: "_SESSJAR",
		genid: (req) => {
			return uuid();
		},
	})
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require("./config/passport_config");
app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- API ROUTING ----------------
 */

mainAPI(app);
productApi(app);
userAPI(app);
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/images", express.static(__dirname + "/public/imgs"));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

setInterval(()=> http.get("https://marketofeveyrthing.herokuapp.com/"), 300000);
//not found route
app.use((req, res) => {
	res.json({ status: 404, message: "NOT FOUND !" });
});

/**
 * -------------- SEVRVER ----------------
 */

app.listen(PORT || 3000, () => {
	console.log(`port is working on port ${PORT}`);
});
