"use strict";

const { Users } = require("../config/database_config").models;
const main_configs = require("../config/main_configs");
const { generatePassword } = require("../lib/passwordUtils");

module.exports = class user {
	/**
	 * -------------- GETTING USER INFO BY ID----------------
	 */

	getUserInfo(id) {
		return new Promise((resolve, reject) => {
			Users.findById(id)
				.then((record) => resolve(record))
				.catch((e) => reject(e));
		});
	}

	/**
	 * -------------- USER EXITSTING VERIFICATION----------------
	 */
	findUser({ username, email, phone }) {
		if (isNaN(phone)) phone = undefined;
		return new Promise((resolve, reject) => {
			Users.findOne({ $or: [{ username }, { email }, { phone }] })
				.then((record) => resolve(record))
				.catch((e) => reject(e));
		});
	}

	/**
	 * -------------- USER CREATION ----------------
	 */
	createUser({ username, email, password, phone }) {
		console.log(phone.split(" "));
		let phoneNumber = phone.split(" ").join();
		const { hash, salt } = generatePassword(password);
		const user = Users({
			username,
			email,
			phone: parseInt(phoneNumber),
			hash,
			salt,
			browsers: [],
		});
		return new Promise((resolve, reject) => {
			user
				.save()
				.then((res) => resolve(res))
				.catch((e) => reject(e));
		});
	}

	/**
	 * -------------- USER LOGIN ----------------
	 */

	async userLogin(req) {
		const _id = req.session.passport.user;
		const userAgent = req.get("user-agent").split(" ");
		const userBrowser = userAgent.at(-1);

		await Users.findOneAndUpdate(
			{ _id },
			{ $addToSet: { browsers: [userBrowser] } }
		);
	}

	/**
	 * -------------- CHANGE USER PASSWORD ----------------
	 */

	async resetPw(email, newPassword) {
		const { salt, hash } = generatePassword(newPassword);
		await Users.findOneAndUpdate({ email }, { hash, salt });
	}
};
