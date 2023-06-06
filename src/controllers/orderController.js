import db from "../models/index"
import orderServices from '../services/orderServices'
const createOrder = async (req, res) => {
  const order = await orderServices.createOrder(req.headers, req.body);
  return res.json({ message: order })
}
const getOrder = async (req, res) => {
  const order = await orderServices.getOrder(req.headers);
  return res.json({ data: order })
}
const getProductByOrderId = async (req, res) => {
  const products = await orderServices.getProductByOrderId(req.query.id);
  return res.json({ data: products })
}
module.exports = {
  createOrder,
  getOrder,
  getProductByOrderId
}
