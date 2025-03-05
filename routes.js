const router = require('express').Router();
const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    deleteProductFromDatabase
} = require('./controllers/productControllers');
const authMiddleware = require('./middlewares/authMiddleware');


router.post('/addProduct', authMiddleware, addProduct);

router.get('/getProducts', authMiddleware, getProducts);

router.put('/updateProduct', authMiddleware, updateProduct);

router.delete('/deleteProduct', authMiddleware, deleteProduct);

router.delete('/deleteProductFromDatabase', authMiddleware, deleteProductFromDatabase);


module.exports = router;