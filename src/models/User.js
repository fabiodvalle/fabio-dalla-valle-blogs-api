const User = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
      id:DataTypes.INTEGER,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: false,
    },
  );

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPosts, {
      as: 'blog_posts',
      foreignKey: 'userId',
    });
  };

  return UserTable;
};

module.exports = User;