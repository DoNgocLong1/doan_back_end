const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('computer_store', 'root', 'long10102001@', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
})
const connectDB = async ()  => {
    try {
        await sequelize.authenticate()
        console.log('successful connect database')
    } catch (err) {
        await sequelize.authenticate()
        console.err('unable connect database')
    }
}
module.exports = connectDB