import userServices from '../services/userServices'
import CRUDuser from '../services/CRUDuser'
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
    if (userData.errCode !== 0){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        userData: userData.user ? userData.user : {}
    })
}
const handleRegistry = async (req, res) => {
    const user = {
        firstname: req.body.fistName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    const registry = await CRUDuser.createUser(user)
    return res.json({message: registry})
}
module.exports = {
    handleLogin,
    handleRegistry
}