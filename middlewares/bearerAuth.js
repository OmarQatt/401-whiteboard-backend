"use strict";

const { User } = require("../models");

const bearerAuth = async (req, res, next) => {

  if (!req.headers.authorization) return res.status(400).send("Invalid Login "+`${req.headers.authorization}`);

  const token = req.headers.authorization.split(" ").pop();
  try {
    console.log("before valid")
    const validUser = User.authenticateToken(token);
    console.log("after valid")
    console.log(validUser)
    let userInfo = await User.findOne({
      where: { userName: validUser.userName },
    });
    if (userInfo) {
      req.user = userInfo;
      req.body.userName = userInfo.userName;
      req.token = userInfo.token;

      next();
    } else {
      return res.send("Invalid Login");
    }
  } catch (e) {
    next(e.message || e);
  }
};
module.exports = bearerAuth;