module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
      "Users",
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          }
        },
        is_logged_in: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
          }
        },
      }
  );

  return Users;
};
