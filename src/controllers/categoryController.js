import categoryServices from '../services/categoryServices'
const createCategory = async (req, res) => {
    const category = await categoryServices.createCategory(req.body)
    return res.json({message: category})
}
const getCategories = async (req, res) => {
    const category = await categoryServices.getCategories()
    return res.json({data: category})
}
module.exports = {
    createCategory,
    getCategories,
}