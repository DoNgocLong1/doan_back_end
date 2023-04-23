import db from "../models/index"
import orderServices from '../services/orderServices'
const createOrder = async (req, res) => {
  const order = await orderServices.createOrder(req.headers, req.body);
  return res.json({ message: order })
}
const getOrder = async (req, res) => {
  const order = await orderServices.getOrder(req.headers);
  return res.json({ message: order })
}
module.exports = {
  createOrder,
  getOrder
}
