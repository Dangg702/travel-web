const nodemailer = require('nodemailer');
const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

const sendEmailCreateBooking = async (bookingData) => {
    let clientMail = bookingData.contactInfo.email;

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
        to: clientMail,
        subject: 'Booking Confirmation',
        text: 'Your booking has been confirmed!',
        html: `
            <h1>Booking Confirmation</h1>
            <p>Dear Customer,</p>
            <p>Your booking has been confirmed. Please find the details below:</p>
            <p><strong>Booking ID:</strong> ${bookingData._id} </p>
            <p><strong>Tour ID:</strong> ${bookingData.tourId._id} </p>
            <p><strong>Tour Name:</strong> ${bookingData.tourId.name}</p>
            <p><strong>Number of people:</strong> ${bookingData.numOfPeople}</p>
            <p><strong>Date go:</strong> ${bookingData.tourId.dateGo}</p>
            <p><strong>Date back:</strong> ${bookingData.tourId.dateBack}</p>
            <p><strong>Time:</strong> 05:00 AM</p>
            <p>Thank you for choosing our service.</p>
            <p>Best regards,</p>
            <p>Viet Travel</p>
        `,
    });
};

module.exports = { sendEmailCreateBooking };
