'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
    Post.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'postId',
      onDelete: 'cascade'
    });
  };
  return Post;
};