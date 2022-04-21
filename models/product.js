'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId"
      })

      Product.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }

    status() {
      if (this.price >= 150000) {
        return `Expensive`
      } else if (this.price > 50000 && this.price < 150000) {
        return `Standard`
      } else {
        return `Cheap`
      }
    }
  }
  Product.init({
    name: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    isBuy: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.isBuy = false;
      }
    }
  });
  return Product;
};