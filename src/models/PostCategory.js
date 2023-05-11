const PostCategory = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false,
    },
  );

  PostCategoryTable.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_post',
      through: PostCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categoty',
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  };


  return PostCategoryTable;
};

module.exports = PostCategory;