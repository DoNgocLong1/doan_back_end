import CRUDuser from '../services/CRUDuser'
const db = require("../models")
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll()
        console.log("data", data)
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        })
    }catch (e) {
        console.log(e)
    }
}
const getCRUD = (req, res) => {
    return res.render("crud.ejs")
}
const postCRUD = async (req, res) => {
    const data = await CRUDuser.createUser(req.body)
    return res.send(data)
}
const getUsers = async (req, res) => {
    const data = await CRUDuser.getUsers()
    console.log(data)
    return res.render('users', {dataTable: data})
}
const editUser = async (req, res) => {
    const data = await CRUDuser.editUser(req.query.id)
    console.log(data)
    return res.render('editUser', { data })
}
const updateUser = async (req, res) => {
    const data = await CRUDuser.updateUser(req.body)
    return res.render('users', {dataTable: data})
}
const deleteUser = async (req, res) => {
    const userId = req.query.id
    if(userId) {
        await CRUDuser.deleteUser(userId)
        return res.send('delete success')
    }else {
        return res.send('user not found')
    }
}
module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    getUsers,
    editUser,
    updateUser,
    deleteUser
}
