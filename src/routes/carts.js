const express = require('express');
const router = express.Router();

const CartsAPI = require('../app/controllers/CartsAPI');
const verifyToken = require('../app/middlewares/verifyToken');

router.patch('/check/:cartId/:isCheckedAll', verifyToken, CartsAPI.toggleCheck);
router.patch('/quantity/:cartId/:amount/:volatility', verifyToken, CartsAPI.updateQuantity);
router.delete('/:cartId', verifyToken, CartsAPI.removeCart);
router.post('/', verifyToken, CartsAPI.insertCart);
router.get('/', verifyToken, CartsAPI.findAll);

module.exports = router;