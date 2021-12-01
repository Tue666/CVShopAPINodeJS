const express = require('express');
const router = express.Router();

const accountsAPI = require('../app/controllers/AccountsAPI');
const verifyToken = require('../app/middlewares/verifyToken');

router.get('/verify', verifyToken, (req, res) => {
    res.json(!!req.user._id);
});
router.post('/refreshToken', accountsAPI.refreshToken);
router.get('/profile', verifyToken, accountsAPI.getProfile);
router.get('/checkExist/:email', accountsAPI.checkExist);
router.post('/login', accountsAPI.login);
router.post('/register', accountsAPI.register);
router.get('/', accountsAPI.findAll);

module.exports = router;
