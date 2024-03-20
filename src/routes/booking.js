const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.get('/book-tour/:id', bookingController.showBookTour);

module.exports = router;
