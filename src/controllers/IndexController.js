const Place = require('../models/Place');
const Tour = require('../models/Tour');
class IndexController {
    async getIndex(req, res, next) {
        const limitNumber = 6;
        const places = await Place.find().limit(limitNumber);
        const latestTours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber).populate('placeData');
        console.log('latest tour', latestTours);
        res.render('home', {
            cssLink: '/css/home.css',
            places,
            latestTours,
        });

        // res.render('500', { layout: false });
    }

    getContact(req, res, next) {
        res.render('contact', {
            cssLink: '/css/contact.css',
        });
    }
}

module.exports = new IndexController();
