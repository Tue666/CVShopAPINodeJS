const express = require('express');
const router = express.Router();

const productsAPI = require('../app/controllers/ProductsAPI');

router.get('/top/:type/:number', productsAPI.topProducts);
router.get('/similar/:productId/:number', productsAPI.similarProducts);
router.get('/:page/:number', productsAPI.listProducts);
router.get('/:slugProduct', productsAPI.getProduct);
router.post('/c', productsAPI.listProductsByCategory);
router.post('/', productsAPI.addProduct);

module.exports = router;
