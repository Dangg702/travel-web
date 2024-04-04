const Vnpay = require('vnpay');
const config = require('../config/vnpay');

exports.createPayment = async (req, res) => {
  try {
    const { idbooking, totalprice } = req.body;

    // Lấy cấu hình từ file config
    const vnpayConfig = config.vnpay;

    // Khởi tạo đối tượng Vnpay với cấu hình
    const vnpay = new Vnpay(vnpayConfig);

    // Dữ liệu thanh toán
    const paymentData = {
      amount: totalprice,
      orderInfo: `Payment for booking ${idbooking}`,
      returnUrl: vnpayConfig.vnp_ReturnUrl,
      ipAddr: req.ip, // Lấy địa chỉ IP của client
    };

    // Tạo URL thanh toán
    const paymentUrl = await vnpay.buildPaymentUrl(paymentData);

    // Redirect đến trang thanh toán
    res.redirect(paymentUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
