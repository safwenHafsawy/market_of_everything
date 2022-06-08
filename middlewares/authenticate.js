"use strict";

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ m: "unauthorized" });
};

module.exports = { checkAuthentication };
