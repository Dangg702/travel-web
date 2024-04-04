const Place = require('../models/Place');
<<<<<<< HEAD
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
        
=======
const Booking = require('../models/Booking');
class DashboardController {
    async getIndex(req, res, next) {
        const bookings = await Booking.find();
        res.render('dashboard', { layout: 'layouts/dashboard-layout', bookings });
>>>>>>> 03454a85631f9b1f0628781366719bcbebd10a52
    }
}

module.exports = new DashboardController();
