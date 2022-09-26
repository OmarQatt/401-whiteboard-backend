'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const User = require('../models').users;

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // if(!isUserNameValid(userName)) {
    //   res.status(401).json({
    //     message: "username or email cannot be empty"
    //   })
    // }
    
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10)
    };

    const user = await User.create(data);

    if(user) {
      res.status(201).json(user)
    }
  } catch(e) {
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
    const user = await User.findOne({where: {
      email: email
    }});
  
  
    if(user) {
      const isSame = await bcrypt.compare(password, user.password);
  
      if(isSame) {
        return res.status(200).json(user)
      } else {
        return res.status(401).send('You are not Authorized');
      }
    } else {
      return res.status(401).send('You are not Authorized');
    }

  } catch(e) {
    console.log(e)
  }
}

const allUser = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// function isUserNameValid(username) {
  
//   const res = /^[a-z0-9_\.]+$/.exec(username);
//   const valid = !!res;
//   return valid;
// }

module.exports = {
  signup,
  allUser,
  login

}