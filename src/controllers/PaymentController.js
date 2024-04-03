// controllers/yourController.js
const $ = require('jquery');
const request = require('request');
const moment = require('moment');
const config = require('config');
const crypto = require('crypto');

function renderOrderList(req, res, next) {
    res.render('orderlist',{layout:'layouts/layout'}, { title: 'Danh sách đơn hàng' });
}

function renderOrder(req, res, next) {
    res.render('order',{layout:'layouts/layout'}, { title: 'Tạo mới đơn hàng', amount: 10000 });
}

function renderQueryDR(req, res, next) {
    res.render('querydr',{layout:'layouts/layout'}, { title: 'Truy vấn kết quả thanh toán' });
}

function createPaymentUrl(req, res, next) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    let locale = req.body.language || 'vn';
    let currCode = 'VND';
    let vnp_Params = {
        'vnp_Version': '2.1.0',
        'vnp_Command': 'pay',
        'vnp_TmnCode': tmnCode,
        'vnp_Locale': locale,
        'vnp_CurrCode': currCode,
        'vnp_TxnRef': orderId,
        'vnp_OrderInfo': 'Thanh toan cho ma GD:' + orderId,
        'vnp_OrderType': 'other',
        'vnp_Amount': amount * 100,
        'vnp_ReturnUrl': returnUrl,
        'vnp_IpAddr': ipAddr,
        'vnp_CreateDate': createDate
    };
    if(bankCode) {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl);
}

function vnpayReturn(req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    if(secureHash === signed) {
        // Check và xử lý kết quả thanh toán ở đây
        res.render('success',{layout:'layouts/layout'}, { code: vnp_Params['vnp_ResponseCode'], title: 'success' });
    } else {
        res.render('success',{layout:'layouts/layout'}, { code: '97', title: 'success' });
    }
}

function vnpayIPN(req, res, next) {
    // Xử lý thông báo trả về từ VNPAY ở đây
    res.sendStatus(200);
}

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
        if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = {
    renderOrderList,
    renderOrder,
    renderQueryDR,
    createPaymentUrl,
    vnpayReturn,
    vnpayIPN
};
