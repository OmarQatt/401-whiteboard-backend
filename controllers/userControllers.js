'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { User } = require('../models');

const signup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
      role
    };

    const user = await User.create(data);

    if (user) {
      res.status(201).json(user)
    }

  } catch (e) {
    console.log(e)

  }
}

const login = async (req, res) => {
  try {
    console.log(req.headers.authorization);

    const basicHeader = req.headers.authorization.split(' ');
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode(encodedValue);

    const [email, password] = decodedValue.split(':');

    const user = await User.findOne({
      where: {
        email: email
      }
    });


    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        return res.status(200).json(user)
      } else {
        return res.status(401).send('You are not Authorized');
      }
    } else {
      return res.status(401).send('You are not Authorized');
    }

  } catch (e) {
    console.log(e)
  }
}

const allUser = async (req, res) => {
  console.log(req.user)
  const users = await User.findAll({ include: { all: true } });
  res.json(users);
};

module.exports = {
  signup,
  allUser,
  login
}