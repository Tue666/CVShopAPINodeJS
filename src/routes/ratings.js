const express = require('express');
const router = express.Router();

const ratingsAPI = require('../app/controllers/RatingsAPI');

router.post('/', ratingsAPI.addRating);

module.exports = router;