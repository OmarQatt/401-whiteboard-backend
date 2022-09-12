'use strict';

const Post = (sequelize, DataTypes) => sequelize.define('Post', {
    post: {
        type: DataTypes.STRING,
        allowToPost: false
    },
    postStatus: {
        type: DataTypes.BOOLEAN,    
        default: true
    }
})

module.exports = Post;