const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        content: { type: String, required: true },
        isFamous: { type: Boolean, required: true, default: false },
        region: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Place', placeSchema);
