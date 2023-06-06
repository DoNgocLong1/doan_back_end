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
      Product.belongsTo(models.Category, { foreignKey: 'id', as: 'categoryData' })
      Product.hasMany(models.Image_Product, { foreignKey: 'productId' })
      Product.hasMany(models.Order_Product, { foreignKey: 'productId', as: 'orderData' })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    parameter: DataTypes.TEXT,
    quantityInStock: DataTypes.INTEGER,
    rate: DataTypes.FLOAT(8, 2),
    discount: DataTypes.FLOAT,
    sold: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
