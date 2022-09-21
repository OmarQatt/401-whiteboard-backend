'use strict';

const { users } = require("../models");

module.exports = async (req, res, next) => {
  console.log('From inside the middleware');
  if( !req.headers.authorization ) (
    next('You\'re not authorized!!!!!!!!!!')
  )

  // console.log(req.headers.authorization)
  const token = req.headers.authorization.split(' ').pop();

  try {
    const validUser = users.authenticateToken(token);
  
    const userInfo = await users.findOne({where: {userName: validUser.userName}});
    if(userInfo) {
      req.user = userInfo;
      req.token = userInfo.token
  
      next();
    } else {
      next('You\'re not authorized!!!!!!!!!!')
    }
    // console.log(userInfo)

  } catch(e) {
    next(e.message || e)
  }
}