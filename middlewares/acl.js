"use strict";


const acl = (capability) => {

  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next("Your not auth for doing this action");
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = acl;