import { productImage } from "../../constant"
import db from "../models/index"
const seeds = (number) => {
    for (let i = 0; i < number; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Product.create({
                    name: `laptop${i}`,
                    categoryId: 1,
                    brand: 'ACER',
                    price: 1000 + 100 * 1,
                    description: 'vedbeeee',
                    parameter: 'beeeer',
                    quantityInStock: 10 + i,
                    rate: 4,
                    discount: 10 + i,
                    sold: 50 + i,
                })
                resolve('create product succeed')
            } catch (e) {
                reject(e)
            }
        })
    }
    for (let i = 0; i < number; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Product.create({
                    name: `Desktop${i}`,
                    categoryId: 2,
                    brand: 'ACER',
                    price: 1000 + 100 * 1,
                    description: 'vedbeeee',
                    parameter: 'beeeer',
                    quantityInStock: 10 + i,
                    rate: 4,
                    discount: 10 + i,
                    sold: 10 + i,
                })
                resolve('create product succeed')
            } catch (e) {
                reject(e)
            }
        })
    }
    for (let i = 0; i < number; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Product.create({
                    name: `monitor${i}`,
                    categoryId: 3,
                    brand: 'ACER',
                    price: 1000 + 100 * 1,
                    description: 'vedbeeee',
                    parameter: 'beeeer',
                    quantityInStock: 10 + i,
                    rate: 4,
                    discount: 10 + i,
                    sold: 20 + i,
                })
                resolve('create product succeed')
            } catch (e) {
                reject(e)
            }
        })
    }
    for (let i = 0; i < number; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Product.create({
                    name: `projector${i}`,
                    categoryId: 4,
                    brand: 'ACER',
                    price: 1000 + 100 * 1,
                    description: 'vedbeeee',
                    parameter: 'beeeer',
                    quantityInStock: 10 + i,
                    rate: 4,
                    discount: 10 + i,
                    sold: 40 + (i * 10),
                })
                resolve('create product succeed')
            } catch (e) {
                reject(e)
            }
        })
    }
    for (let i = 0; i < number; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Product.create({
                    name: `graphic card${i}`,
                    categoryId: 5,
                    brand: 'ACER',
                    price: 1000 + 100 * 1,
                    description: 'vedbeeee',
                    parameter: 'beeeer',
                    quantityInStock: 10 + i,
                    rate: 4,
                    discount: 10 + i,
                    sold: 30 + (1 * 5),
                })
                resolve('create product succeed')
            } catch (e) {
                reject(e)
            }
        })
    }
    for (let i = 0; i < number; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Product.create({
                    name: `accessory${i}`,
                    categoryId: 6,
                    brand: 'ACER',
                    price: 1000 + 100 * 1,
                    description: 'vedbeeee',
                    parameter: 'beeeer',
                    quantityInStock: 10 + i,
                    rate: 4,
                    discount: 10 + i,
                    sold: 50 + i,
                })
                resolve('create product succeed')
            } catch (e) {
                reject(e)
            }
        })
    }
}

const seedImage = () => {
    /* for (let i = 1; i < 15; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Image_Product.create({
                    productId: i,
                    image: productImage.laptop,
                })
                console.log(i)
                resolve('create image succeed')
            } catch (e) {
                reject(e)
            }
        })
    } */
    /* for (let i = 16; i < 30; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Image_Product.create({
                    productId: i,
                    image: productImage.monitor,
                })
                resolve('create image succeed')
            } catch (e) {
                reject(e)
            }
        })
    } */
    for (let i = 31; i < 45; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Image_Product.create({
                    productId: i,
                    image: productImage.monitor,
                })
                resolve('create image succeed')
            } catch (e) {
                reject(e)
            }
        })
    }
    /* for (let i = 46; i < 60; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Image_Product.create({
                    productId: i,
                    image: productImage.cards,
                })
                resolve('create image succeed')
            } catch (e) {
                reject(e)
            }
        })
    } */
    /* for (let i = 61; i < 75; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Image_Product.create({
                    productId: i,
                    image: productImage.chair,
                })
                resolve('create image succeed')
            } catch (e) {
                reject(e)
            }
        })
    } */
    /* for (let i = 76; i < 90; i++) {
        new Promise(async (resolve, reject) => {
            try {
                await db.Image_Product.create({
                    productId: i,
                    image: productImage.access,
                })
                resolve('create image succeed')
            } catch (e) {
                reject(e)
            }
        })
    } */
}
module.exports = { seeds, seedImage }
