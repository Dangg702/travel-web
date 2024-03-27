const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                // return res.status(404).json({ message: 'Unauthorization', status: 'ERROR' });
                res.render('404', {
                    layout: false,
                });
            }
            // console.log('user: ', user);
            if (user.isAdmin) {
                next();
            } else {
                //res.redirect('/');
                //return res.status(404).json({ message: 'Unauthorization', status: 'ERROR' });
                res.render('403', {
                    layout: false,
                    user,
                });
            }
        });
    } else {
        res.redirect('/user/login');
    }
};

const authUserMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    const userName = req.params.name;
    // console.log('userName', userName);

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(404).json({ message: 'Unauthorization', status: 'ERROR' });
            }
            // console.log('user: ', user);
            if (user.isAdmin || user.name === userName) {
                next();
            } else {
                //return res.status(404).json({ message: 'Unauthorization', status: 'ERROR' });
                res.redirect('/user/login');
            }
        });
    } else {
        res.redirect('/user/login');
    }
};

module.exports = { authMiddleware, authUserMiddleware };
