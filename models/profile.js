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
      Profile.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }
  }
  Profile.init({
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'age is required'
        },
        min: {
          args: 10,
          msg: 'min age is 10'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'gender is required'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'phone is required'
        },
        len: {
          args: [5, 15],
          msg: 'phone number minimum 5 digit and maximum 15 digit'
        }
      }
    },
    userCode: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (ins, opt) => {
        ins.userCode = `${ins.gender[0]}-${ins.phone.slice(0,5)}`
      }
    },
    modelName: 'Profile',
  });
  return Profile;
};