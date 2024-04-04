const Place = require('../models/Place');
const Booking = require('../models/Booking');
class DashboardController {
    async getIndex(req, res, next) {
        const bookings = await Booking.find();
        res.render('dashboard', { layout: 'layouts/dashboard-layout', bookings });
    }
}

module.exports = new DashboardController();
