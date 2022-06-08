"use strict";

const crypto = require("crypto");

function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");

  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    100000,
    128,
    "sha512"
  ).toString("hex");

  return { hash, salt };
}

function validatePassword(hash, salt, pw) {
  const verifypassowrd = crypto.pbkdf2Sync(pw, salt, 100000, 128, "sha512").toString("hex");

  return hash === verifypassowrd;
}

module.exports = { generatePassword, validatePassword };
