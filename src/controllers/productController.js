import productServices from '../services/productServices'
import CRUDuser from '../services/CRUDuser'
const db = require("../models")
const listProduct = (req, res) => {
    return res.render("crud.ejs")
}
const postProduct = async (req, res) => {
    await CRUDuser.createUser(req.body)
    return res.render("product/createProduct.ejs")
}
const editProduct = async (req, res) => {
    const data = await CRUDuser.editUser(req.query.id)
    console.log(data)
    return res.render('editUser', { data })
}
const updateProduct = async (req, res) => {
    const data = await CRUDuser.updateUser(req.body)
    return res.render('users', {dataTable: data})
}
const deleteProduct = async (req, res) => {
    const userId = req.query.id
    if(userId) {
        await CRUDuser.deleteUser(userId)
        return res.send('delete success')
    }else {
        return res.send('user not found')
    }
}

const createProduct = async (req, res) => {
    const product = await productServices.createProduct(req.body)
    return res.json({message: product})
}
const getProduct = async (req, res) => {
    const productList = await productServices.getAllProduct()
    return res.json(productList)
}
const popularProduct = async (req, res) => {
    const productList = await productServices.getPopularProduct()
    return res.json(productList)
}
const filterProduct = async (req, res) => {
    const productList = await productServices.filterProduct(req.query)
    return res.json({
        data: productList,
        perPage: 10,
        total: 90,
    })
}
const createProductImage = async (req, res) => {
    const productList = await productServices.createProductImage(req.body)
    return res.json(productList)
}
const count = async (req, res) => {
    const productList = await productServices.count(req.body)
    return res.json(productList)
}

const selectProduct = async (req, res) => {
    const product = await productServices.productDetail(req.query.id)
    return res.json(product)
}
module.exports = {
    listProduct,
    postProduct,
    editProduct,
    updateProduct,
    deleteProduct,
    createProduct,
    getProduct,
    popularProduct,
    filterProduct,
    createProductImage,
    count,
    selectProduct,
}
