const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
};
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
};

class AuthController {
    // POST /register
    register(req, res, next) {
        const { name, password } = req.body;
        User.findOne({ name: name })
            .then((user) => {
                if (user) {
                    res.json({ message: 'User already exists' });
                } else {
                    // ma hoa password
                    const hash = bcrypt.hashSync(password, 10);
                    const user = new User({ name, password: hash });
                    user.save()
                        .then(() => res.json({ message: 'User created successfully' }))
                        .catch(next);
                }
            })
            .catch(next);
    }

    // POST /login
    login(req, res, next) {
        const { name, password } = req.body;
        User.findOne({ name })
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
}

module.exports = new AuthController();
