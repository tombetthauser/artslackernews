'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
    Comment.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'postId'
    });
    Comment.belongsTo(models.Comment, {
      as: 'comment',
      foreignKey: 'commentId'
    });
    Comment.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};