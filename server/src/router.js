const express = require("express");
const router = express.Router();
const authController = require("./controllers/user/authController"); 
const {getUserOwnData,updateUser, changePassword} = require("./controllers/user/userController"); 
const {createCategory, getCategories, deleteCategory} = require('./controllers/content/categories/categoriesController');
const {createPartner,getPartners, deletePartner}= require('./controllers/content/partners/partnerController');
const {createProduct, getProducts, deleteProduct,getProductById, getProductsByCategory}= require('./controllers/product/productController');
const {getUserCart, addProductToCart, deleteFromCart}= require('./controllers/user/cartController');

const authenticateToken = require("./services/middlewares/authenticateToken");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/userown",authenticateToken,  getUserOwnData);
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.delete("/categories/:id", deleteCategory);
router.post('/partner', createPartner)
router.get('/partner', getPartners)
router.delete("/partner/:id", deletePartner);
router.post('/product', createProduct);
router.post('/product/filter', getProducts);
router.delete('/product/:id', deleteProduct);
router.get('/product', getProductById);
router.get('/products/:category', getProductsByCategory);
router.patch('/change-password', authenticateToken, changePassword);
router.post('/cart', authenticateToken, addProductToCart);
router.get('/cart', authenticateToken, getUserCart);
router.delete('/cart/:id', authenticateToken, deleteFromCart); 
router.patch("/users/:id", updateUser);



module.exports = router;