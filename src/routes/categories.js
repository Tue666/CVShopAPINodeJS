const express = require('express');
const router = express.Router();

const categoriesAPI = require('../app/controllers/CategoriesAPI');

router.get('/:slugCategory', categoriesAPI.getCategory);
router.get('/', categoriesAPI.listCategories);
router.post('/', categoriesAPI.addCategory);

module.exports = router;