const Place = require('../models/Place');
const User = require('../models/User');

const jwt = require('jsonwebtoken'); // Thêm dòng này
class DashboardController {
    getIndex(req, res, next) {
        const access_token = req.cookies.access_token;
        jwt.verify(access_token, process.env.ACCESS_TOKEN, function(err, decoded) {
            if (err) {
                console.error('Error decoding JWT:', err);
            } else {
                console.log('Decoded JWT payload:', decoded);
                
                // Sử dụng id từ decoded để tìm kiếm người dùng trong model user
                User.findOne({ _id: decoded.id })
                    .then(user => {
                        if (user) {
                            console.log('User found:', user);
                            
                                res.render('dashboard', { layout: 'layouts/dashboard-layout',user });
                            
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(err => {
                        console.error('Error finding user:', err);
                    });
                   
            }
        });
        
    }
}

module.exports = new DashboardController();
