const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourGuideSchema = new Schema(
    {
        name: { type: String, required: true },
        avatar: { type: String },
        age: { type: Number, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String, required: true },
        desc: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('TourGuide', tourGuideSchema);
