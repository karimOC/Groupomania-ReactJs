"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
          allowNull: false,
        },
      });
      models.Message.hasMany(models.Comment, {
        foreignKey: {
          name: "idMessages",
          allowNull: false,
        },
      });
    }
  }
  Message.init(
    {
      idUsers: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      like: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
