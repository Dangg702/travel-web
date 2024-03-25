const vnpay = require('vnpay');
const Booking = require('../models/Booking');
//const config = require('../config');

class PaymentController {
    async createPaymentRequest(req, res) {
        try {
            const { tourId, userId, numOfPeople, unitPrice, totalPrice } = req.body;

            // Tạo yêu cầu thanh toán
            const vnpayConfig = {
                vnp_TmnCode: 'B9J82O5K',
                vnp_HashSecret: 'CYKEBWCVDUWVRNICDHGUWDGRNNVXZGBS',
                vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
                vnp_ReturnUrl: 'http://localhost:9000/api/payment/create',
            };

            const orderInfo = `Thanh toán đơn đặt tour ${tourId} của người dùng ${userId}`;
            const vnpParams = {
                vnp_Amount: parseInt(totalPrice), // Số tiền thanh toán, tính bằng VNĐ và nhân 100
                vnp_Command: 'pay',
                vnp_CreateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
                vnp_CurrCode: 'VND',
                vnp_Locale: 'vn',
                vnp_OrderInfo: orderInfo,
                vnp_OrderType: 'billpayment',
                vnp_ReturnUrl: 'http://localhost:9000/api/payment/create',
               // vnp_TxnRef: orderId.toString(),
                vnp_Version: '2.0.0',
            };

            //const paymentUrl = vnpayClient.buildPaymentUrl(vnpParams);
            //res.json({ paymentUrl });
        } catch (error) {
            console.error('Error creating payment request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
}

module.exports = new PaymentController();
