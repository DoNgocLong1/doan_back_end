import db from "../models/index"
const seeds = (number) => {
    for(let i =0; i< number; i++) {
        new Promise(async (resolve, reject) => {
            try{
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
            }catch (e) {
                reject(e)
            }
        })
    }
    for(let i =0; i< number; i++) {
        new Promise(async (resolve, reject) => {
            try{
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
            }catch (e) {
                reject(e)
            }
        })
    }
    for(let i =0; i< number; i++) {
        new Promise(async (resolve, reject) => {
            try{
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
            }catch (e) {
                reject(e)
            }
        })
    }
    for(let i =0; i< number; i++) {
        new Promise(async (resolve, reject) => {
            try{
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
            }catch (e) {
                reject(e)
            }
        })
    }
    for(let i =0; i< number; i++) {
        new Promise(async (resolve, reject) => {
            try{
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
            }catch (e) {
                reject(e)
            }
        })
    }
    for(let i =0; i< number; i++) {
        new Promise(async (resolve, reject) => {
            try{
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
            }catch (e) {
                reject(e)
            }
        })
    }
}
module.exports = {seeds}