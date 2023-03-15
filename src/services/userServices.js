import db from "../models/index";
const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            })
            if(user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}
const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {}
            const isExist = await checkUserEmail(email)
            if(isExist) {
                const user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email: email},
                    raw: true
                })
                if(user) {
                    if(user.password === password) {
                        userData.errCode = 0
                        userData.errMessage = "login success"
                        delete user.password
                        userData.user = user
                    }else {
                        userData.errCode = 3
                        userData.errMessage = "Wrong password"
                    }
                }
            }else {
                userData.errCode = 1
                userData.errMessage = `Your Email isn't exist`
            }
            resolve(userData)
        } catch(e) {
            reject(e)
        }
    })
}
const handleRegistryUser = () => {

}
module.exports = {
    handleUserLogin,
    handleRegistryUser
}