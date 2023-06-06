import db from "../models/index"
import jwt from "jsonwebtoken";
const createOrder = async (headers, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = headers.authorization.split(' ')[1];
      const userData = jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
        if (err) {
          return 'Invalid token';
        } else {
          const email = decodedToken.email;
          const user = await db.User.findOne({
            where: { email: email },
            raw: true
          })
          const newOrder = await db.Order.create({
            userId: user.id,
            fullName: data.fullName,
            amount: data.amount,
            orderList: data.orderList,
            phoneNumber: data.phoneNumber,
            note: data.note,
          })
          const products = JSON.parse(data.orderList)
          products.forEach(async (item) => {
            await db.Order_Product.create({
              orderId: newOrder.dataValues.id,
              productId: item.product_id,
              quantity: item.quantity,
            })
          })
          return 'create order succeed'
        }
      })
      resolve(userData)
    } catch (e) {
      reject(e)
    }
  })
}
const getOrder = async (headers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = headers.authorization.split(' ')[1];
      const userData = jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
        if (err) {
          return 'Invalid token';
        } else {
          const email = decodedToken.email;
          const user = await db.User.findOne({
            where: { email: email },
            raw: true
          })
          const orderList = await db.Order.findAll({
            where: { userId: user.id }
          })
          return orderList
        }
      })
      resolve(userData)
    } catch (e) {
      reject(e)
    }
  })
}
const getProduct = async (item) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        where: { id: item.product_id }
      })
      if (product) {
        resolve(product)
      }
    } catch (e) {
      reject(e)
    }
  })
}
const getProductByOrderId = async (id) => {
  return new Promise(async (resolve, reject) => {
    const response = {}
    try {
      const orderInfo = await db.Order.findOne({
        where: { id }
      })
      response.orderInfo = orderInfo
      const orderList = await db.Order_Product.findAll({
        where: { orderId: id },
        include: [{
          model: db.Product,
          as: 'orderData',
        },
        {
          model: db.Image_Product,
          attributes: ['image'],
        }
        ]
      })
      response.orderList = orderList
      resolve(response)
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  createOrder,
  getOrder,
  getProductByOrderId
}
