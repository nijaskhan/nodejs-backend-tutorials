const router = require('express').Router();
const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    deleteProductFromDatabase
} = require('./controllers/productControllers');
const { addUser, getUsers, addProductToUserCart } = require('./controllers/userControllers');
const authMiddleware = require('./middlewares/authMiddleware');

// PRODUCT_ROUTES
router.post('/addProduct', authMiddleware, addProduct);

router.get('/getProducts', authMiddleware, getProducts);

router.put('/updateProduct', authMiddleware, updateProduct);

router.delete('/deleteProduct', authMiddleware, deleteProduct);

router.delete('/deleteProductFromDatabase', authMiddleware, deleteProductFromDatabase);

// USER_ROUTES
router.post('/addUser', authMiddleware, addUser);

router.get('/getUsers', authMiddleware, getUsers);

router.put('/addProductToUserCart', authMiddleware, addProductToUserCart)

module.exports = router;