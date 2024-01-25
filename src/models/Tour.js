const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema(
    {
        name: { type: String, required: true },
        place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
        dateGo: { type: Date, required: true },
        dateBack: { type: Date, required: true },
        note: { type: String },
        tourGuideId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourGuide', required: true },
        imgUrl: { type: String },
        process: { type: String, required: true },
        price: { type: Number, required: true },
        quality: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Tour', tourSchema);
