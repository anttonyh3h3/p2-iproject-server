"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coaching extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coaching.belongsTo(models.User)
      Coaching.belongsTo(models.Pro, { foreignKey: "ProId", as: "Coach" })
    }
  }
  Coaching.init(
    {
      UserId: DataTypes.INTEGER,
      ProId: DataTypes.INTEGER,
      appointment: DataTypes.DATE,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Coaching",
    }
  );
  return Coaching;
};
