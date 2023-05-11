const BlogPost = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
      id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      tableName: 'blog_post',
      underscored: true,
      timestamps: false,
    },
  );

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    BlogPostTable.hasMany(models.PostCategory, {
      as: 'posts_categories',
      foreignKey: 'postId',
    });
  };


  return BlogPostTable;
};

module.exports = BlogPost;