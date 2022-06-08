"use strict";

const uuid = require("uuid").v4;
const userClass = require("../services/user");
const USER = new userClass();
const sendUserEmail = require("../lib/resetPw.js");

const createUserCnt = (req, res, next) => {
	//checking if user exists
	const userDetails = req.body;
	USER.findUser(userDetails)
		.then((record) => {
			// email || username || phone is already used
			if (record)
				return res.json({
					status: 401,
					message:
						"Username, email or phone number are already used ! please try again",
				});
			//if no user with same email || username already exists
			//processed to create new user account
			USER.createUser(userDetails)
				.then((record) => {
					res.json({
						status: 201,
						message: `Your account was created successfully ! Welcome ${record.username}`,
					});
				})
				.catch((e) => {
					console.log(e);
					res.json({ status: 500, message: "could not create account" });
				});
		})
		.catch((e) => {
			return res.json({ status: 500, message: "internal server error" });
		});
};

const userLoginCnt = (req, res, next) => {
	USER.userLogin(req);
	let newExpirationDate = new Date().getTime() + 1296000 * 1000;
	req.session.cookie.expires = new Date(newExpirationDate);
	res.json({
		status: 200,
		message: "login successful",
		userID: req.user._id,
		username: req.user.username,
	});
};

const userLogout = (req, res) => {
	req.session.destroy(() => {
		res.json({ status: 200, message: "Logged out succesfully" });
	});
};

const getUserInfo = async (req, res, next) => {
	const { id } = req.query;

	USER.getUserInfo(id)
		.then((record) => res.json({ status: 200, userInfo: record }))
		.catch((e) => res.json({ e, m: "could not get user" }));
};

const sendEmail = async (req, res) => {
	const resetCode = uuid();
	const { email } = req.body;
	try {
		const userAccount = await USER.findUser({ email });
		console.log(userAccount);
		if (userAccount === null)
			return res.json({ status: 404, message: "email not found" });
	} catch (e) {
		return res.json({ status: 500, message: "internal server error" });
	}

	const emailSent = await sendUserEmail(email, resetCode);

	if (emailSent) {
		req.session.resetPw = { email, resetCode };
		return res.json({ status: 200, message: "email sent" });
	} else return res.json({ status: 500, message: "could not send email" });
};

const resetPassword = async (req, res) => {
	const { email } = req.session.resetPw;
	const { newPw } = req.body;
	try {
		await USER.resetPw(email, newPw);
		delete req.session.resetPw;
		return res.json({ status: 201, message: "Password Updated Succefully !" });
	} catch (e) {
		console.log(e);
		return res.json({ status: 500, message: "internal server error !" });
	}
};

module.exports = {
	createUserCnt,
	userLoginCnt,
	userLogout,
	getUserInfo,
	sendEmail,
	resetPassword,
};
