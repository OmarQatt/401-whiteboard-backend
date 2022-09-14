'use strict';

const Comment = (sequelize, DataTypes) => sequelize.define('Comment', {
    commentWriter: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentLike: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Comment;
