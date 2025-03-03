const router = require('express').Router();
const { addProduct, getProducts, updateProduct } = require('./controllers/userControllers');
const authMiddleware = require('./middlewares/authMiddleware');

router.post('/addProduct', authMiddleware, addProduct);

router.get('/getProducts', authMiddleware, getProducts);

router.put('/updateProduct', authMiddleware, updateProduct);

module.exports = router;