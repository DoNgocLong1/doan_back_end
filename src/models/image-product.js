'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image_Product.belongsTo (models.Product, {foreignKey: 'id'})
    }
  };
  Image_Product.init({
    productId: DataTypes.INTEGER,
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Image_Product',
  });
  return Image_Product;
};