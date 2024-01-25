const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        bookingItems: [
            {
                name: { type: String, required: true },
                amount: { type: String, required: true },
                image: { type: String, required: true },
                // price: { type: String, required: true },
                tour: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Tour',
                },
            },
        ],
        paymentMethod: { type: String, required: true },
        totalPrice: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Booking', bookingSchema);
