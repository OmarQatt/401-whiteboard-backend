'use strict';

const Post = (sequelize, DataTypes) => sequelize.define('userPost', {
    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postStatus: {
        type: DataTypes.BOOLEAN,    
        defaultValue: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Post;