'use strict';

const Comment = (sequelize, DataTypes) => sequelize.define('userComment', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Comment;
