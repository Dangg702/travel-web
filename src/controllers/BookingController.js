const Tour = require('../models/Tour');

class BookingController {
    async showBookTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const tour = await Tour.findById(tourId).populate('placeData');
            console.log('showBookTour', tour);
            if (!tour) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                // return res.status(200).json({ message: 'Success', data: tour });
                res.render('book-tour', {
                    cssLink: '/css/tourDetail.css',
                    tour,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    
}

module.exports = new BookingController();
