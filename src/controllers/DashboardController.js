const Place = require('../models/Place');
class DashboardController {
    getIndex(req, res, next) {
        res.render('dashboard', { layout: 'layouts/dashboard-layout' });
    }
}

module.exports = new DashboardController();
