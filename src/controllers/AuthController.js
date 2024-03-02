const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../services/JwtService');

class AuthController {
    // POST /register
    register(req, res, next) {
        const { email, username, password } = req.body;

        User.findOne({ email })
            .then((user) => {
                if (user) {
                    // res.json({ message: 'User already exists' });
                    res.redirect('/user/login');
                } else {
                    // ma hoa password
                    const hash = bcrypt.hashSync(password, 10);
                    const user = new User({ email, username, password: hash });
                    user.save()
                        .then(() => {
                            // res.json({ message: 'User created successfully' });
                            res.redirect('/');
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }

    // POST /login
    login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    const access_token = generateAccessToken({ id: user.id, isAdmin: user.isAdmin });
                    const refresh_token = generateRefreshToken({ id: user.id, isAdmin: user.isAdmin });
                    if (bcrypt.compareSync(password, user.password)) {
                        res.json({ message: 'Login successfully', access_token, refresh_token });
                    } else {
                        res.json({ message: 'Wrong password' });
                    }
                } else {
                    res.json({ message: 'User does not exist' });
                }
            })
            .catch(next);
    }

    // GET /login or /register
    loginForm(req, res, next) {
        res.render('signInUp', { layout: false });
    }
}

module.exports = new AuthController();
