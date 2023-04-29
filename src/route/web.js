import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import categoryController from "../controllers/categoryController";
import orderController from "../controllers/orderController";
const router = express.Router()
const initWebRouters = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/users', homeController.getUsers)
    router.get('/edit-user', homeController.editUser)
    router.post('/put-user', homeController.updateUser)
    router.get('/delete-user', homeController.deleteUser)
    router.get('/api/user/find-user', userController.findUserByToken)
    router.post('/api/user/create-user', userController.handleCreateUser)
    router.post('/api/user/update-user', userController.handleUpdateUser)
    router.get('/api/user/all-user', userController.getAllUsers)

    router.post('/api/login', userController.handleLogin)
    router.post('/api/registry', userController.handleRegistry)

    router.post('/api/create-category', categoryController.createCategory)
    router.post('/api/delete-category', categoryController.deleteCategory)
    router.post('/api/edit-category', categoryController.editCategory)
    router.post('/api/update-category', categoryController.updateCategory)
    router.get('/api/get-categories', categoryController.getCategories)

    router.post('/api/create-product', productController.createProduct)
    router.post('/api/delete-product', productController.deleteProduct)
    router.post('/api/edit-product', productController.editProduct)
    router.post('/api/update-product', productController.updateProduct)
    router.get('/api/   products/get-all-products', productController.listProduct)
    router.get('/api/products/popular-product', productController.popularProduct)
    router.post('/api/create-product-image', productController.createProductImage)
    router.get('/api/products/get-all-products', productController.getProduct)
    router.get('/api/products/filter', productController.filterProduct)
    router.get('/api/products/count', productController.count)
    router.get('/api/products/product-detail', productController.selectProduct)
    //router.get('/api/search', productController.searchProduct)

    router.post('/api/order/create-order', orderController.createOrder)
    router.get('/api/order/get-order', orderController.getOrder)
    return app.use('/', router)
}
module.exports = initWebRouters

