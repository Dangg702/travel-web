// routes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

// Route cho trang danh sách đơn hàng
router.get('/', paymentController.renderOrderList);

// Route cho trang tạo mới đơn hàng
router.get('/create_payment_url', paymentController.renderOrder);
router.post('/create_payment_url', paymentController.createPaymentUrl);

// Route cho trang truy vấn kết quả thanh toán
router.get('/querydr', paymentController.renderQueryDR);
router.post('/querydr', paymentController.queryDR);

// Route cho trang hoàn tiền giao dịch thanh toán
router.get('/refund', paymentController.renderRefund);
router.post('/refund', paymentController.refund);

// Route cho VNPAY trả về kết quả
router.get('/vnpay_return', paymentController.vnpayReturn);

// Route cho VNPAY IPN (Instant Payment Notification)
router.post('/vnpay_ipn', paymentController.vnpayIPN);

module.exports = router;
