const Place = require('../models/Place');
const Tour = require('../models/Tour');
const User = require('../models/User');
const TourService = require('../services/TourService');

class IndexController {
    async getIndex(req, res, next) {
        const tourService = new TourService();

        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }

        const limitNumber = 6;
        const regions = ['miền bắc', 'miền trung', 'miền nam']; // Danh sách các khu vực
        const toursByRegion = {}; // Object lưu trữ các tour theo khu vực
        for (const region of regions) {
            const tours = await Tour.find().populate({
                path: 'placeData',
                match: { region: region },
            });
            const filteredTours = tours.filter((tour) => tour.placeData !== null); // Lọc ra các tour có placeData không null
            toursByRegion[region] = filteredTours; // Lưu các tour theo từng khu vực vào object
        }
        const latestTours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber).populate('placeData');

        res.render('home', {
            cssLink: '/css/home.css',
            user,
            toursByRegion,
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
