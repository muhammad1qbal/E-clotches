'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasOne(models.User, {
        foreignKey: "ProfileId"
      })
    }
  }
  Profile.init({
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    userCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};