module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define(
      "Chats",
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          }
        },
        room_id: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          }
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          }
        },
      }
  );

  return Chats;
};
