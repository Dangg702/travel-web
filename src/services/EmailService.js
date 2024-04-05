const nodemailer = require('nodemailer');
const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

const sendEmailCreateBooking = async () => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT,
        to: 'dawn24123@gmail.com',
        subject: 'Booking Confirmation',
        text: 'Your booking has been confirmed!',
        html: `
            <h1>Booking Confirmation</h1>
            <p>Dear Customer,</p>
            <p>Your booking has been confirmed. Please find the details below:</p>
            <p><strong>Booking ID:</strong> ABC123</p>
            <p><strong>Date:</strong> April 5, 2024</p>
            <p><strong>Time:</strong> 10:00 AM</p>
            <p>Thank you for choosing our service.</p>
            <p>Best regards,</p>
            <p>Your Company</p>
        `,
    });
};

module.exports = { sendEmailCreateBooking };
