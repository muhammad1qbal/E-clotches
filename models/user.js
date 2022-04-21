'use strict';
const { hash } = require('../helpers/security');
const nodemailer = require("nodemailer")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    mail(id, productId) {
      let sendEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'iqbal.muh998@gmail.com',
          pass: 'kqboucqllkvhtmiu'
        }
      })
      let mailOptions = {
        from: 'iqbal.muh998@gmail.com',
        to: this.email,
        subject: 'E-Clothes',
        text: `Do you want to buy product? if you want click http://localhost:3000/buyers/${id}/products/${productId}/confirm`
      }

      sendEmail.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
      })
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: "UserId"
      })

      User.hasOne(models.Profile, {
        foreignKey: "UserId"
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email is required'
        },
        isEmail: {
          msg: 'email not valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'role is required'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (ins, opt) => {
        console.log(ins.password);
        ins.password = hash(ins.password)
      }
    },
    modelName: 'User',
  });
  return User;
};