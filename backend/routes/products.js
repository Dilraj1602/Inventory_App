const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addProduct, updateProductQuantity, getProducts } = require('../controllers/productController');

router.post('/', auth, addProduct);
router.put('/:id/quantity', auth, updateProductQuantity);
router.get('/', auth, getProducts);

module.exports = router; 