const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../services/JwtService');
const jwt = require('jsonwebtoken'); // Thêm dòng này
const cookieParser = require('cookie-parser'); // Thêm dòng này

class AuthController {
    // POST /register
    register(req, res, next) {
        const { email, username, password } = req.body;

        User.findOne({ email })
            .then((user) => {
                if (user) {
                    res.redirect('/user/login');
                } else {
                    const hash = bcrypt.hashSync(password, 10);
                    const user = new User({ email, username, password: hash });
                    user.save()
                        .then(() => {
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
                        // Lưu token vào cookie
                        res.cookie('access_token', access_token, { httpOnly: true });
                        res.cookie('refresh_token', refresh_token, { httpOnly: true });
                        res.json({ message: 'Login successfully', isLogin: true, isAdmin: user.isAdmin });
                    } else {
                        res.json({ message: 'Wrong password', isLogin: false });
                    }
                } else {
                    res.json({ message: 'User does not exist', isLogin: false });
                }
            })
            .catch(next);
    }

    // GET /login or /register
    loginForm(req, res, next) {
        res.render('signInUp', { layout: false });
    }

    // POST /logout
    logout(req, res, next) {
        // Xóa token từ cookie
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chính
        res.redirect('/user/login');
        console.log('Đã logout');
    }

    // GET /check-login
    checkLoginStatus(req, res, next) {
        // Kiểm tra xem cookies có tồn tại không
        if (!req.cookies.access_token) {
            res.json({ iisLoggedIn: false });
            return; // Dừng hàm và trả về kết quả
        }

        // Kiểm tra xem cookie access_token có tồn tại không
        const access_token = req.cookies.access_token;
        if (!access_token) {
            res.json({ isLoggedIn: false });
            return; // Dừng hàm và trả về kết quả
        } else {
            res.json({ isLoggedIn: true });
        }
    }
}

module.exports = new AuthController();
