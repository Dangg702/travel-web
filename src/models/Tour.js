const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema(
    {
        name: { type: String, required: true },
        placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
        duration: { type: String }, // vd: 3 ngày 2 đêm
        dateGo: { type: Date, required: true },
        dateBack: { type: Date, required: true },
        desc: { type: String },
        tourGuideId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourGuide', required: true },
        imgUrl: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Tour', tourSchema);
