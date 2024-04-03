const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');
const { authUserMiddleware, authenticateToken } = require('../middleware/authMiddleware');

router.get('/booking-form/:id', authUserMiddleware, bookingController.showBookTour);
router.post('/book-tour/:id', authUserMiddleware, authenticateToken, bookingController.bookTour);

module.exports = router;
