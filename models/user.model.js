'use strict';

const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return jwt.sign({
          userName: this.userName
        },process.env.JWT_SECRET)
      },
      set(tokenObject) {
        return jwt.sign(tokenObject, process.env.JWT_SECRET)
      }
    }
  });

  User.authenticateToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if(error) {
        return error;
      } else {
        return decoded;
      }
    })
  }
  return User;
}