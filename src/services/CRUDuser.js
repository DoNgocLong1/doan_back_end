import db from "../models/index"
import bcrypt from 'bcryptjs';
//import bcryptjs from "bcryptjs";
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
const createUser = async (data) => {
    const passwordHashData = await handleHashPassword(data.password)
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.create({
                email: data.email,
                password: passwordHashData,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                image: data.image,
                roleId: data.roleId,
            })
            resolve('create user succeed')
        } catch (e) {
            reject(e)
        }
    })
}
const getUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = db.User.findAll({ raw: true })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
const editUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.email = data.email
                user.firstName = data.firstname
                user.lastName = data.lastname
                user.address = data.address
                user.phonenumber = data.phonenumber
                user.gender = data.gender
                await user.save()
                const allUsers = await db.User.findAll({ raw: true })
                resolve(allUsers)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy()
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    getUsers,
    editUser,
    updateUser,
    deleteUser
}
