import userServices from '../services/userServices'
import CRUDuser from '../services/CRUDuser'
import jwt from "jsonwebtoken";
const handleLogin = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "missing parameters!"
        })
    }
    const userData = await userServices.handleUserLogin(email, password)
    if (userData.errCode !== 0) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        token: userData.token,
        userData: userData.user ? userData.user : {}
    })
}
const handleCreateUser = async (req, res) => {
    const data = await userServices.createUser(req.body)
    if (data.status !== 200) {
        return res.status(400).json(data)
    }
    return res.status(200).json(data)
}
const handleUpdateUser = async (req, res) => {
    const data = await userServices.updateUser(req.headers, req.body)
    return res.json(data)
}
const handleUpdateUserByID = async (req, res) => {
    const data = await userServices.updateUserByID(req.body)
    return res.json(data)
}
const handleDeleteUserByID = async (req, res) => {
    const data = await userServices.deleteUserByID(req.body.id)
    return res.json(data)
}
const handleRegistry = async (req, res) => {
    const user = {
        firstname: req.body.fistName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    const registry = await CRUDuser.createUser(user)
    return res.json({ message: registry })
}
const findUserByToken = async (req, res) => {
    const data = await userServices.findUser(req.headers)

    return res.json(data)
};
const getAllUsers = async (req, res) => {
    const data = await userServices.getAllUsers()
    return res.json(data)
};
const getUsersById = async (req, res) => {
    const data = await userServices.getUsersById(req.query.id)
    return res.json(data)
}
const changePassword = async (req, res) => {
    const data = await userServices.changePassword(req.headers, req.body)
    if (data.status === 400) {
        return res.status(400).json(data.message)
    }
    return res.status(200).json(data.message)
}
module.exports = {
    handleLogin,
    handleRegistry,
    handleCreateUser,
    handleUpdateUser,
    findUserByToken,
    getAllUsers,
    getUsersById,
    handleUpdateUserByID,
    handleDeleteUserByID,
    changePassword
}
