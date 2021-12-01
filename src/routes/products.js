const express = require('express');
const router = express.Router();

const productsAPI = require('../app/controllers/ProductsAPI');

router.get('/top/:type/:number', productsAPI.topProducts);
router.get('/similar/:productId/:number', productsAPI.similarProducts);
router.get('/:page/:number', productsAPI.findAllWithPagination);
router.get('/:slugProduct', productsAPI.findBySlug);
router.post('/c', productsAPI.findByCategory);
router.post('/', productsAPI.insertProduct);

module.exports = router;
