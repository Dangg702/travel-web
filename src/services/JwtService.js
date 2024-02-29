const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
    return accessToken;
};

const generateRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refreshToken;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) {
                console.error(err);
                resolve({
                    message: 'The authenticated',
                    status: 'ERROR',
                });
            }
            console.log('user: ' + user);
            const accessToken = generateAccessToken({ id: user.id, isAdmin: user.isAdmin });
            console.log('accessToken: ', accessToken);
            resolve({
                message: 'Success',
                status: 'OK',
                accessToken,
            });
        });
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenJwtService,
};
