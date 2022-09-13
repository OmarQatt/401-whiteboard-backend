'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const Post = require('./post.model');

const POSTGRES_URL = 'postgres://hkdrqlxsebrdww:63e770231804f17f4105a8cb9cedf1663b16b78d99411a31a495a82871d6ace1@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/d373aa7aaq3lqs' || 'postgresql://omar:0000@localhost:5432/postgres'

let sequelize = new Sequelize(POSTGRES_URL);

module.exports = {
    db: sequelize,
    Post: Post(sequelize,DataTypes)
}
