'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coaching extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coaching.init({
    UserId: DataTypes.INTEGER,
    ProId: DataTypes.INTEGER,
    appointment: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coaching',
  });
  return Coaching;
};