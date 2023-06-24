import sequelize from "sequelize";
import db from "../models/index"
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Product.create({
                name: data.name,
                categoryId: data.categoryId,
                brand: data.brand,
                price: data.price,
                description: data.description,
                parameter: data.parameter,
                quantityInStock: data.quantityInStock,
                rate: data.rate,
                discount: data.discount,
            })
            resolve('create product succeed')
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.Product.findAll({
                include: [
                    {
                        model: db.Image_Product,
                        attributes: ['image']
                    }
                ],
                raw: true,
                nest: true,
                limit: 10,
            })
            if (products) {
                resolve(products)
            } else {
                resolve('product list empty')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProduct = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findOne({
                where: { id: id }
            })
            if (product) {
                await product.destroy()
            }
            resolve('delete Product succeed')
        } catch (e) {
            reject(e)
        }
    })
}
const editProduct = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findOne({
                where: { id: id },
                raw: true
            })
            if (product) {
                resolve(product)
            } else {
                resolve('Product not found')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findOne({
                where: { id: data.id }
            })
            if (product) {
                product.name = data.name
                product.categoryId = data.categoryId
                product.brand = data.brand
                product.price = data.price
                product.description = data.description
                product.parameter = data.parameter
                product.quantityInStock = data.quantityInStock
                product.rate = data.rate
                product.discount = data.discount
                product.sold = data.sold
                await product.save()
                resolve('update Product succeed')
            } else {
                resolve('update Product failed')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getPopularProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.Product.findAll({
                include: [
                    {
                        model: db.Image_Product,
                        attributes: ['image']
                    }
                ],
                order: [
                    ['sold', 'DESC'],
                ],
                raw: true,
                nest: true,
                limit: 20,
            })
            if (products) {
                resolve(products)
            } else {
                resolve('product list empty')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getProductByCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.Product.findAll({
                where: {
                    categoryId
                },
                raw: true
            })
            if (products) {
                resolve(products)
            } else {
                resolve('product list empty')
            }
        } catch (e) {
            reject(e)
        }
    })

}
const createProductImage = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            await db.Image_Product.create({
                productId: data.productId,
                image: data.image,
            })
            resolve('create image succeed')
        } catch (e) {
            reject(e)
        }
    })

}
const searchProduct = (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.substring]: String(search),
                    }
                },
                raw: true,
            })
            if (products) {
                resolve(products)
            } else {
                resolve('product list empty')
            }
        } catch (e) {
            reject(e)
        }
    })

}
const filterProduct = (params) => {

    let rules = []
    if (params.search) {
        rules = [
            ...rules,
            { name: { [Op.substring]: String(params.search) } }
        ]
    }
    if (params.category) {
        if (params.category === '0') {
            rules = rules
        } else {
            rules = [
                ...rules,
                { categoryId: params.category }
            ]
        }
    }
    if (params.price_from && params.price_to) {
        rules = [
            ...rules,
            { price: { [Op.between]: [params.price_from, params.price_to] } },
        ]
    }
    let orderRules = []
    if (params.sort_key && params.sort_rule) {
        let sortKey
        let sortRule
        if (params.sort_key === 'date') {
            sortKey = 'createdAt'
            sortRule = params.sort_rule === 'newest' ? 'ASC' : 'DESC'
        } else if (params.sort_key === 'price') {
            sortKey = 'price'
            sortRule = params.sort_rule === 'increase' ? 'ASC' : 'DESC'
        } else if (params.sort_key === 'name') {
            sortKey = 'name'
            sortRule = params.sort_rule === 'az' ? 'ASC' : 'DESC'
        }
        orderRules = [...orderRules, [sortKey, sortRule]]
    }
    const pageSize = 12
    const page = params.page || 1
    const skip = (page - 1) * pageSize
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.Product.findAndCountAll({
                include: [
                    {
                        model: db.Image_Product,
                        attributes: ['image'],
                    }
                ],
                where: {
                    [Op.and]: rules
                },
                order: orderRules,
                offset: skip,
                limit: pageSize,
                raw: true,
                nest: true,
                distinct: true,
                group: ['Product.id']
            })
            if (products) {
                const productList = [];
                products?.rows?.forEach((item) => {
                    const findItem = productList.find((product => product.id === item.id))
                    if (!findItem) {
                        productList.push(item)
                    }
                })
                resolve({
                    data: productList,
                    count: products.count.length,
                })
            } else {
                resolve('product list empty')
            }
        } catch (e) {
            reject(e)
        }
    })

}
const count = (params) => {
    let rules = []
    if (params.search) {
        rules = [
            ...rules,
            { name: { [Op.substring]: String(params.search) } }
        ]
    }
    if (params.category) {
        rules = [
            ...rules,
            { categoryId: params.category }
        ]
    }
    if (params.price_from && params.price_to) {
        rules = [
            ...rules,
            { price: { [Op.between]: [params.price_from, params.price_to] } },
        ]
    }
    let orderRules = []
    if (params.sort_key && params.sort_rule) {
        const sortKey = params.sort_key === 'date' ? 'createdAt' : 'price'
        const sortRule = params.sort_rule === 'increase' ? 'ASC' : 'DESC'
        orderRules = [...orderRules, [sortKey, sortRule]]
    }
    console.log("rules :", rules)
    const pageSize = 12
    const page = params.page || 1
    const skip = (page - 1) * pageSize
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.Product.count({
                where: {
                    [Op.and]: rules
                },
                order: orderRules,
                offset: skip,
                limit: pageSize,
            })
            if (products) {
                resolve({
                    total: count,
                    products
                })
            } else {
                resolve('product list empty')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const productDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {}
            const product = await db.Product.findOne({
                where: {
                    id: id,
                }
            })
            data.product = product
            const images = await db.Image_Product.findAll({
                where: { productId: id },
            })
            data.images = images
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })

}

const getProductImage = async (query) => {
    const pageSize = 12
    const page = query.page || 1;
    const skip = (page - 1) * pageSize
    return new Promise(async (resolve, reject) => {
        try {
            const images = await db.Image_Product.findAll({
                offset: skip,
                limit: pageSize,
            })
            if (images) {
                resolve(images)
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProductImage = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await db.Image_Product.findOne({
                where: { productId: data.productId }
            })
            if (image) {
                image.image = data.image
                await image.save()
                resolve('update Image succeed')
            } else {
                resolve('update Image failed')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProductImage = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await db.Image_Product.findOne({
                where: { productId: id }
            })
            if (image) {
                await image.destroy()
            }
            resolve('delete image succeed')
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    editProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getPopularProduct,
    getProductByCategory,
    searchProduct,
    filterProduct,
    createProductImage,
    count,
    productDetail,
    updateProductImage,
    deleteProductImage,
    getProductImage
}
