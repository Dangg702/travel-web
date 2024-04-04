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
                res.status(200).json({ message: 'Tour booked successfully', status: 'ok',data: newBooking });
            }
        } catch (err) {
            next(err);
        }
    }
    // PATCH /booking/update-tour/:id
    async updateBooking(req, res, next) {
        try {
            const bookingId = req.params.id;
            const updateData = req.body;
            const updatedTour = await Booking.findByIdAndUpdate(bookingId, updateData);
            if (!updatedTour) {
                return res.status(404).json({ message: 'No booking found', status: 'fail' });
            }
            res.status(200).json({ message: 'Booking updated successfully', status: 'ok', tour: updatedTour });
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
    // GET /user/account/:id/booking-info
    async getUserBookingInfo(req, res, next) {
        try {
            const userId = req.params.id;
            const bookings = await Booking.find({ userId }).populate('tourId');
            console.log('bookings', bookings);
            res.render('booking-info', {
                cssLink: '/css/booking-info.css',
                bookings,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BookingController();
