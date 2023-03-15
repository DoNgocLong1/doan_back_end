import db from "../models/index"
const createCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.Category.create({
                name: data.name,
                image: data.image,
            })
            resolve('create category succeed')
        }catch (e) {
            reject(e)
        }
    })
}
const getCategories = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            const categories = await db.Category.findAll({
                attributes: ['id', 'name', 'image']
            })
            resolve(categories)
        }catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createCategory,
    getCategories
}