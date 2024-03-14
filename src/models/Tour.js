const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema(
    {
        name: { type: String, required: true },
        placeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }],
        duration: { type: String }, // vd: 3 ngày 2 đêm
        dateGo: { type: Date, required: true },
        dateBack: { type: Date, required: true },
        desc: { type: String },
        price: { type: String, required: true },
        imgUrl: [{ type: String }],
        rating: { type: Number },
        content: { type: String },
        schedule: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Tour', tourSchema);
