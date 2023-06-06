'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId', as: 'order' })
      Order.hasOne(models.Order_Product, { foreignKey: 'productId', as: 'orderListItem' })
    }
  };
  Order.init({
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    orderList: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    note: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
