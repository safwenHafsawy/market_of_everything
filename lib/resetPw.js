"use strict";

const nodeMailer = require("nodemailer");
const { USERMAIL, EMAILPW } = require("../config/main_configs.js");

module.exports = async function sendUserEmail(userMail, resetCode) {
	let transporter = nodeMailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: USERMAIL,
			pass: EMAILPW,
		},
	});

	let mailDetails = {
		from: USERMAIL,
		to: userMail,
		subject: "Password Reset",
		html: `<h1>Market Of Everything </h1>
					<h2>Reset Your Password</h2>
					<p><strong>This is your reset code : </strong> ${resetCode} </p>
					<p>Please note that this code can only be used once and is only valid for 24 hours</p>
		`,
	};

	try {
		const sendMail = await transporter.sendMail(mailDetails);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};
