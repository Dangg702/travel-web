const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        userName: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
        tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
        tourName: { type: mongoose.Schema.Types.String, ref: 'Tour', required: true },
        rating: { type: Number },
        comment: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Review', reviewSchema);
