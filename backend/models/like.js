"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.User.belongsToMany(models.Message, {
      //   through: models.Like,
      //   foreignKey: "idUsers",
      //   otherKey: "idMessages",
      // });

      // models.Message.belongsToMany(models.User, {
      //   through: models.Like,
      //   foreignKey: "idMessages",
      //   otherKey: "idUsers",
      // });

      models.Like.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
        },
      });

      models.Like.belongsTo(models.Message, {
        foreignKey: "idMessages",
        as: "message",
      });
      models.Message.hasMany(models.Comment, {
        foreignKey: {
          name: "idUsers",
        },
      });
      models.Message.hasMany(models.Comment, {
        foreignKey: {
          name: "idMessages",
        },
      });
    }
  }
  Like.init(
    {
      idUsers: DataTypes.INTEGER,
      idMessages: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
