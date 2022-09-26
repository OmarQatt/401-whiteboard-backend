'use strict';

const { signup, allUser, login } = require('../controllers/userControllers');
const userAuth = require('../middlewares/userAuth');
const bearerAuth = require('../middlewares/bearerAuth');
const router = require('express').Router();

router.post('/login', login);
router.post('/signup',userAuth,  signup)
router.get('/users',  allUser)

module.exports = router;