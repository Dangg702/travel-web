const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');
const bookingController = require('../controllers/BookingController');

router.get('/account/:id/booking-info', bookingController.getUserBookingInfo);
router.get('/account/:id', userController.getAccount);
router.get('/login', authController.loginForm);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/check-login', authController.checkLoginStatus);

module.exports = router;
