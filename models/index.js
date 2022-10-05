'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const Post = require('./post.model');

const Comment = require('./comment.model');
const collection = require('../collections/user-comment-routes');
const POSTGRES_URL = process.env.DATABASE_URL || process.env.DATABASE_LOCAL


const sequelizeOption = {
    //  dialectOptions: {
    //    ssl: {
    //      require: true,
    //      rejectUnauthorized: false,
    //    },
    //  },
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

db.users.hasMany(commentModel, {foreignKey: 'userID', sourceKey: 'id'})
commentModel.belongsTo(db.users, {foreignKey: 'userID', targetKey: 'id'});

db.users.hasMany(postModel, {foreignKey: 'userID', sourceKey: 'id'})
postModel.belongsTo(db.users, {foreignKey: 'userID', targetKey: 'id'});

const userCollection = new collection(postModel)
const commentCollection = new collection(commentModel);


module.exports = {
    db: sequelize,
    Post: userCollection,
    Comment: commentCollection,
    commentModel: commentModel,
    User: db.users
}
