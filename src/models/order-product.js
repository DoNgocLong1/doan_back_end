'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_Product.belongsTo(models.Order, { foreignKey: 'id', as: 'orderListItem' })
      Order_Product.hasOne(models.Product, { foreignKey: 'id', as: 'orderData' })
      Order_Product.hasMany(models.Image_Product, { foreignKey: 'productId' })
    }
  };
  Order_Product.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order_Product',
  });
  return Order_Product;
};
