const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(404).json({ message: 'Unauthorization' });
            }
            // console.log('user: ', user);
            if (user.isAdmin) {
                next();
            } else {
                return res.status(404).json({ message: 'Unauthorization' });
            }
        });
    } else {
        res.json({ message: 'No token provided' });
    }
};

module.exports = { authMiddleware };
