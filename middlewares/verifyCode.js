"use strict";

module.exports = function verifyCode(req, res, next) {
	//checking  if all the codes exists
	if (
		!req.body.hasOwnProperty("userCode") ||
		!req.session.hasOwnProperty("resetPw") ||
		!req.session.resetPw.hasOwnProperty("resetCode")
	)
		return res.json({ status: 400, message: "Invalid Code(s)" });

	//comparing the 2 codes
	const { userCode } = req.body;
	const { resetCode } = req.session.resetPw;
	if (resetCode == userCode) next();
	else return res.json({ status: 400, message: "Invalid Code(s)" });
};
