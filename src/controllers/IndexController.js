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
        const latestTours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber).populate('placeData');
        const regionArr = ['miền bắc', 'miền trung', 'miền nam'];
        let toursBac = {};
        let toursTrung = {};
        let toursNam = {};
        const regionPromises = regionArr.map((region) => {
            return tourService
                .getLatestToursByRegion(region, limitNumber)
                .then((tours) => {
                    if (region === 'miền bắc') {
                        toursBac = { region: region, tours: tours };
                    } else if (region === 'miền trung') {
                        toursTrung = { region: region, tours: tours };
                    } else {
                        toursNam = { region: region, tours: tours };
                    }
                })
                .catch((error) => {
                    console.error('Error retrieving tours:', error);
                });
        });

        await Promise.all(regionPromises);

        res.render('home', {
            cssLink: '/css/home.css',
            user,
            latestTours,
            toursBac,
            toursTrung,
            toursNam,
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
