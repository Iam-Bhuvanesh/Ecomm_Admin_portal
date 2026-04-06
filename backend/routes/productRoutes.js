const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, admin, upload.array('images', 5), addProduct);

router.route('/:id')
    .put(protect, admin, upload.array('images', 5), updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
