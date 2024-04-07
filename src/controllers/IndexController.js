const Place = require('../models/Place');
const Tour = require('../models/Tour');
const User = require('../models/User');

class IndexController {
    async getIndex(req, res, next) {
        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }
        // const regions = ['Bắc Bộ', 'Bắc Trung Bộ', 'Duyên hải Nam Trung Bộ', 'Tây Nguyên', 'Đông Nam Bộ', 'Tây Nam Bộ'];
        const limitNumber = 6;
        const tours = await Tour.find().populate('placeData');
        const latestTours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber).populate('placeData');
        // console.log('getIndex', tours);
        res.render('home', {
            cssLink: '/css/home.css',
            user,
            tours,
            latestTours,
        });
    }

    async getContact(req, res, next) {
        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }
        res.render('contact', {
            cssLink: '/css/contact.css',
            user,
        });
    }
}

module.exports = new IndexController();
