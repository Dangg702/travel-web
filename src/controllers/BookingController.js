const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
class BookingController {
    // GET booking/booking-form/:id
    async showBookTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const tour = await Tour.findById(tourId).populate('placeData');
            console.log('showBookTour', tour);
            if (!tour) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                res.render('book-tour', {
                    cssLink: '/css/tourDetail.css',
                    message: 'Success',
                    tour,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    // POST booking/book-tour/:id
    async bookTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const tour = await Tour.findById(tourId).populate('placeData');
            if (!tour) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                const price = parseInt(tour.price.replace(/\,/g, ''));
                const bookingData = {
                    tourId: tour._id,
                    userId: req.user.id,
                    contactInfo: req.body.contactInfo,
                    numOfPeople: req.body.numOfPeople,
                    unitPrice: tour.price,
                    totalPrice: (price * req.body.numOfPeople).toLocaleString(),
                    paymentMethod: req.body.paymentMethod,
                };
                const newBooking = new Booking(bookingData);
                await newBooking.save();
                res.status(200).json({ message: 'Tour booked successfully', status: 'ok' });
            }
        } catch (err) {
            next(err);
        }
    }

    // PUT /booking/update-tour/:id
    async updateTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const updateData = req.body;
            const updatedTour = await Tour.findByIdAndUpdate(tourId, updateData, { new: true });
            if (!updatedTour) {
                return res.status(404).json({ message: 'No tour found' });
            }
            res.status(200).json({ message: 'Tour updated successfully', status: 'ok', tour: updatedTour });
        } catch (err) {
            next(err);
        }
    }
    // DELETE /booking/delete-tour/:id
    async deleteTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const deletedTour = await Tour.findByIdAndDelete(tourId);
            if (!deletedTour) {
                return res.status(404).json({ message: 'No tour found' });
            }
            res.status(200).json({ message: 'Tour deleted successfully', status: 'ok' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BookingController();
