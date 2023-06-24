import productServices from '../services/productServices'
import CRUDuser from '../services/CRUDuser'

const listProduct = (req, res) => {
    return res.render("crud.ejs")
}

const createProduct = async (req, res) => {

    const product = await productServices.createProduct(req.body)
    return res.json({ message: product })
}
const editProduct = async (req, res) => {
    const data = await productServices.editProduct(req.query.id)

    return res.json({ message: data })
}
const updateProduct = async (req, res) => {
    const data = await productServices.updateProduct(req.body)
    return res.json({ message: data })
}
const deleteProduct = async (req, res) => {
    const productId = req.body.id
    if (productId) {
        const data = await productServices.deleteProduct(productId)
        return res.json({ message: data })
    } else {
        return res.json({ message: 'product not found' })
    }
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
    console.log('productList', productList)
    return res.json({
        data: productList,
        perPage: 12,
        total: productList.count,
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
const updateProductImage = async (req, res) => {
    const product = await productServices.updateProductImage(req.body)
    return res.json(product)
}
const deleteProductImage = async (req, res) => {
    const productId = req.body.id
    console.log(req.body)
    if (productId) {
        const data = await productServices.deleteProductImage(productId)
        return res.json({ message: data })
    } else {
        return res.json({ message: 'product not found' })
    }
}
const getProductImage = async (req, res) => {
    const data = await productServices.getProductImage(req.query)
    return res.json(data)
}
module.exports = {
    listProduct,
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
    updateProductImage,
    deleteProductImage,
    getProductImage
}
