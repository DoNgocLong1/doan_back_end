import productServices from '../services/productServices'
const createProduct = async (req, res) => {
    const product = await productServices.createProduct(req.body)
    return res.json({message: product})
}
const getProduct = async (req, res) => {
    const productList = await productServices.getAllProduct()
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
module.exports = {
    createProduct,
    getProduct,
    filterProduct,
    createProductImage
}
