import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
const handleHashPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        };
    })
};
const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
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
            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    const check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        const token = jwt.sign({ email: email }, process.env.JWT_KEY, { expiresIn: '900000s' })
                        userData.token = token
                        userData.errMessage = "login success"
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = "Wrong password"
                    }
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your Email isn't exist`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
const handleRegistryUser = () => {

}
const findUser = (headers) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = headers.authorization.split(' ')[1];
            const data = jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
                if (err) {
                    return 'Invalid token';
                } else {
                    const email = decodedToken.email;
                    const user = await db.User.findOne({
                        where: { email: email },
                        raw: true
                    })
                    delete user.password
                    return user
                }
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}
const createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        const response = {}
        try {
            const isExist = await checkUserEmail(data.email)
            console.log(isExist)
            if (isExist) {
                response.message = 'Email is already exist'
                response.status = 400
            } else {
                const passwordHashData = await handleHashPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: passwordHashData,
                    fullName: data.fullName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    image: data.image,
                    roleId: data.roleId || 2,
                })
                response.message = 'Create user succeed'
                response.status = 200
            }
            resolve(response)
        } catch (e) {
            reject(e)
        }
    })
}
const updateUserByID = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.fullName = data.fullName
                user.address = data.address
                user.phoneNumber = data.phoneNumber
                user.address = data.address
                user.image = data.image
                user.roleId = data.roleId
                await user.save()
                resolve('update succeed')
            } else {
                resolve('update failed')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const update = async (email, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                user.fullName = data.fullName
                user.address = data.address
                user.phoneNumber = data.phoneNumber
                user.address = data.address
                user.image = data.image
                console.log(data.image)
                await user.save()
                resolve('update succeed')
            } else {
                resolve('update failed')
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = async (headers, data) => {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        try {
            const token = headers.authorization.split(' ')[1];
            const updateInfo = jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
                if (err) {
                    return 'Invalid token';
                } else {
                    const email = decodedToken.email;
                    return update(email, data)
                }
            })
            resolve(updateInfo)
        } catch (e) {
            reject(e)
        }
    })
}
const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUsers = await db.User.findAll()
            resolve(allUsers)
        } catch (e) {
            reject(e)
        }
    })
}
const getUsersById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: id }
            })
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUserByID = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: id }
            })
            if (user) {
                await user.destroy()
                resolve('delete user succeed')
            } else {
                resolve('delete user failed')
            }
        } catch (e) {
            reject(e)
        }
    })
}

const changePassword = async (headers, dataUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = {}
            const token = headers.authorization.split(' ')[1];
            const data = jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
                if (err) {
                    return 'Invalid token';
                } else {
                    const email = decodedToken.email;
                    const user = await db.User.findOne({
                        where: { email: email },
                    })
                    if (user) {
                        const check = await bcrypt.compareSync(dataUser.password, user.password)
                        if (check) {
                            const hasPass = await handleHashPassword(dataUser.newPassword)
                            user.password = hasPass
                            await user.save()
                            response.status = 200
                            response.message = "Change password succeed"
                        } else {
                            response.status = 400
                            response.message = "Your password incorrect"
                        }
                    }
                }
                return response;
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin,
    handleRegistryUser,
    createUser,
    updateUser,
    findUser,
    getAllUsers,
    getUsersById,
    updateUserByID,
    deleteUserByID,
    changePassword
}
