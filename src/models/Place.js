const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String},
        img: { type: String },
        isFamous: { type: Boolean, required: true, default: false },
        region: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Place', placeSchema);
