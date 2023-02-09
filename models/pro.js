"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pro.belongsToMany(models.User, { through: "Coaching" })
    }
  }
  Pro.init(
    {
      name: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      content: DataTypes.STRING,
      agent_uuid: DataTypes.STRING,
      uuid: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Pro",
    }
  );
  return Pro;
};
