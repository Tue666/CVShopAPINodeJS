const express = require('express');
const router = express.Router();

const categoriesAPI = require('../app/controllers/CategoriesAPI');

router.get('/:slugCategory', categoriesAPI.findBySlug);
router.get('/', categoriesAPI.findAll);
router.post('/', categoriesAPI.insertCategory);

module.exports = router;