'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const Post = require('./post.model');

const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://omar:0000@localhost:5432/postgres"

let sequelize = new Sequelize(POSTGRES_URL);

module.exports = {
    db: sequelize,
    Post: Post(sequelize,DataTypes)
}