const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

// Route để tạo yêu cầu thanh toán
router.post('/create', PaymentController.createPaymentRequest);
router.get('/create', (req, res) => {
    res.render('payment'); // Render trang payment.ejs
});

module.exports = router;
