const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema(
    {
        name: { type: String, required: true },
        placeData: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
        duration: { type: String }, // vd: 3 ngày 2 đêm
        dateGo: { type: String, required: true },
        dateBack: { type: String, required: true },
        desc: { type: String },
        price: { type: String, required: true },
<<<<<<< HEAD
        imgUrl: { type: [String] },
=======
        img: [{ type: String }],
        rating: { type: Number },
        schedule: [
            {
                title: { type: String },
                content: { type: String },
                img: { type: String },
            },
        ],
        departure: { type: String },
        destination: { type: String },
        vehicle: { type: String },
>>>>>>> f6c7004d5c0f238ee6b12a1d215078c8001e545f
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Tour', tourSchema);
