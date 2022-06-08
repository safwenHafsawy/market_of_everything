"use strict";

module.exports = function (app) {
	app.route("/api/home").get((req, res) => {
		if (req.user) {
			return res.json({
				status: 200,
				userID: req.user._id,
				username: req.user.username,
			});
		} else {
			return res.json({ status: 200, userID: null, username: null });
		}
	});
};
