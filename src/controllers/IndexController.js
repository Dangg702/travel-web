const Place = require('../models/Place');
const Tour = require('../models/Tour');
class IndexController {
    async getIndex(req, res, next) {
        // const regions = ['Bắc Bộ', 'Bắc Trung Bộ', 'Duyên hải Nam Trung Bộ', 'Tây Nguyên', 'Đông Nam Bộ', 'Tây Nam Bộ'];
        const limitNumber = 6;
        const tours = await Tour.find().populate('placeData');
        const latestTours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber).populate('placeData');
        console.log('getIndex', tours);
        res.render('home', {
            cssLink: '/css/home.css',
            tours,
            latestTours,
        });
    }

    getContact(req, res, next) {
        res.render('contact', {
            cssLink: '/css/contact.css',
        });
    }
}

module.exports = new IndexController();
