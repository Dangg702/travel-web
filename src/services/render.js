const axios = require('axios');
const passport = require('passport');

exports.login = (req, res) => {
    res.render('login');
};

exports.loginout = (req, res) => {
    res.render('login');
};

exports.logout = (req, res) => {
    req.logOut();
    res.redirect('/users/login');
};

exports.loginpost = (req, res) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            res.redirect('/users/login');
        } else {
            if (!user) {
                res.redirect('/users/login');
            } else {
                req.login(user, function (err) {
                    if (err) {
                        res.redirect('/login');
                    } else {
                        if (user.role === 'Admin') {
                            res.redirect('/chief');
                        }
                        if (user.role === 'Alap') {
                            res.redirect('/tables');
                        }
                    }
                });
            }
        }
    })(req, res);
};

exports.usermindrender = (req, res) => {
    axios
        .get('http://localhost:3000/api/users')
        .then(function (response) {
            res.render('admin', { users: response.data });
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
};

exports.onlyforadmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.redirect('/warning');
    }
    next();
};
