'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pro.init({
    name: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    content: DataTypes.STRING,
    AgentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pro',
  });
  return Pro;
};