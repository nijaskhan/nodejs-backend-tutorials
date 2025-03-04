const router = require('express').Router();
const { addProduct, getProducts } = require('./controllers/productControllers');
const authMiddleware = require('./middlewares/authMiddleware');


router.post('/addProduct', authMiddleware, addProduct);

router.get('/getProducts', authMiddleware, getProducts);


module.exports = router;