import categoryServices from '../services/categoryServices'
const createCategory = async (req, res) => {
    const category = await categoryServices.createCategory(req.body)
    return res.json({ message: category })
}
const deleteCategories = async (req, res) => {
    const category = await categoryServices.deleteCategory(req.body.id)
    return res.json({ data: category })
}
const getCategories = async (req, res) => {
    const category = await categoryServices.getCategories()
    return res.json({ data: category })
}
module.exports = {
    createCategory,
    deleteCategories,
    getCategories,
}
