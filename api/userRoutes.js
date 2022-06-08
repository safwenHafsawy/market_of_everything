"use strict";

const passport = require("passport");
const {
	createUserCnt,
	userLoginCnt,
	userLogout,
	getUserInfo,
	sendEmail,
	resetPassword,
} = require("../controllers/userCnt");

const verifyCode = require("../middlewares/verifyCode.js");

module.exports = function (app) {
	app.route("/api/signup").post(createUserCnt);

	app.route("/api/userinfo").get(getUserInfo);

	app.route("/api/login").post(passport.authenticate("local"), userLoginCnt);

	app.route("/api/logout").post(userLogout);

	app.route("/api/sendemail").post(sendEmail);

	app.route("/api/resetpassword").post(verifyCode,resetPassword);
};
