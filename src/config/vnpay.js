const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

module.exports = {
    vnpay: {
        vnp_TmnCode: 'OHR5LZ0M',
        vnp_HashSecret: 'L3LHBTVZC3JY4XX3VP71DJG4DHWQ703B',
        vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        vnp_ReturnUrl: 'https://travel-web-lyc3.onrender.com/api/payment/vnpay_return',
        vnp_Api: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
    },
};
