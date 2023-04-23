import db from "../models/index"
const createCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Category.create({
                name: data.name,
                image: data.image,
            })
            resolve('create category succeed')
        } catch (e) {
            reject(e)
        }
    })
}
const deleteCategory = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await db.Category.findOne({
                where: { id: id }
            })
            if (category) {
                await category.destroy()
            }
            resolve('delete category succeed')
        } catch (e) {
            reject(e)
        }
    })
}
const getCategories = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await db.Category.findAll({
                attributes: ['id', 'name', 'image']
            })
            resolve(categories)
        } catch (e) {
            reject(e)
        }
    })
}
const editCategory = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await db.Category.findOne({
                where: { id: id },
                raw: true
            })
            if (category) {
                resolve(category)
            } else {
                resolve('category not found')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateCategory = async (data) => {
    console.log("data", data)
    return new Promise(async (resolve, reject) => {
        try {
            const category = await db.Category.findOne({
                where: { id: data.id }
            })
            if (category) {
                category.name = data.name
                category.image = data.image
                await category.save()
                resolve('update category succeed')
            } else {
                resolve('update category failed')
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
    editCategory,
    updateCategory
}
