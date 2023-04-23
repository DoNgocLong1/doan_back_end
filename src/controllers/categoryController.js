import categoryServices from '../services/categoryServices'
const createCategory = async (req, res) => {
    const category = await categoryServices.createCategory(req.body)
    return res.json({ message: category })
}
const deleteCategory = async (req, res) => {
    const categoryId = req.body.id
    if (categoryId) {
        const category = await categoryServices.deleteCategory(categoryId)
        return res.json({ message: category })
    } else {
        return res.json({ message: 'category not found' })
    }
}
const updateCategory = async (req, res) => {
    const category = await categoryServices.updateCategory(req.body)
    return res.json({ message: category })
}
const editCategory = async (req, res) => {
    const category = await categoryServices.editCategory(req.body.id)
    return res.json({ data: category })
}
const getCategories = async (req, res) => {
    const category = await categoryServices.getCategories()
    return res.json({ data: category })
}
module.exports = {
    createCategory,
    deleteCategory,
    editCategory,
    updateCategory,
    getCategories,
}
