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
          await db.Order.create({
            userId: user.id,
            fullName: data.fullName,
            amount: data.amount,
            orderList: data.orderList,
            phoneNumber: data.phoneNumber,
            note: data.note,
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
module.exports = {
  createOrder,
  getOrder
}
