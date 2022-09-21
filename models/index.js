'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const Post = require('./post.model');
const Comment = require('./comment.model');
const collection = require('../collections/user-comment-routes');
const POSTGRES_URL = process.env.DATABASE_URL || 'postgresql://omar:0000@localhost:5432/postgres'

const sequelizeOption = {
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  };
let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

sequelize.authenticate().then(() => {
  console.log('Database connected to postgres');
}).catch((err) => {
  console.log(err)
});
const db = {};
db.sequelize = sequelize;
db.users = require('./user.model') (sequelize, DataTypes)


let postModel = Post(sequelize, DataTypes);
let commentModel = Comment(sequelize, DataTypes);

postModel.hasMany(commentModel, {foreignKey: 'postID', sourceKey: 'id'})
commentModel.belongsTo(postModel, {foreignKey: 'postID', targetKey: 'id'});

const userCollection = new collection(postModel)
const commentCollection = new collection(commentModel);
module.exports = {
    db: sequelize,
    Post: userCollection,
    Comment: commentCollection,
    commentModel: commentModel,
    users: db.users
}
