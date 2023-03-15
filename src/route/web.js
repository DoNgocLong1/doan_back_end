import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import categoryController from "../controllers/categoryController";
const router = express.Router()
const initWebRouters = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/users', homeController.getUsers)
    router.get('/edit-user', homeController.editUser)
    router.post('/put-user', homeController.updateUser)
    router.get('/delete-user', homeController.deleteUser)


    router.post('/api/login', userController.handleLogin)
    router.post('/api/registry', userController.handleRegistry)

    router.post('/api/create-category', categoryController.createCategory)
    router.get('/api/get-categories', categoryController.getCategories)

    router.post('/api/products/create-product', productController.createProduct)
    router.post('/api/create-product-image', productController.createProductImage)
    router.get('/api/products/get-all-products', productController.getProduct)
    router.get('/api/products/filter', productController.filterProduct)
    //router.get('/api/search', productController.searchProduct)
    return app.use('/', router)
}
module.exports = initWebRouters

