const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
    if (!accessToken) return res.sendStatus(401);
    try {
        const user = await jwt.verify(accessToken, process.env.SECRET_SIGNATURE);
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.sendStatus(401);
        }
        res.sendStatus(403);
    }
};

module.exports = verifyToken;