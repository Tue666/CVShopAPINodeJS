const jwt = require('jsonwebtoken');

const generateToken = payload => {
    const accessToken = jwt.sign(payload, process.env.SECRET_SIGNATURE,
        {
            expiresIn: 60 * 60
        }
    );
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_SIGNATURE,
        {
            expiresIn: 60 * 60 * 48
        }
    );
    return { accessToken, refreshToken };
};

module.exports = {
    generateToken
};