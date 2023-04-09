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
        console.log(params.category === '0')
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
            const products = await db.Product.findAll({
                include: [
                    {
                        model: db.Image_Product,
                        attributes: ['image']
                    }
                ],
                /* attributes: {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('name')), 'total'],
                    ],
                }, */
                where: {
                    [Op.and]: rules
                },
                order: orderRules,
                offset: skip,
                limit: pageSize,
                raw: true,
                nest: true,
                //group: ['id']
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
            const product = await db.Product.findOne({
                where: {
                    id: id,
                }
            })
            resolve(product)
        } catch (e) {
            reject(e)
        }
    })

}
module.exports = {
    createProduct,
    getAllProduct,
    getPopularProduct,
    getProductByCategory,
    searchProduct,
    filterProduct,
    createProductImage,
    count,
    productDetail,
}
