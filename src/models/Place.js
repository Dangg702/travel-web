const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
<<<<<<< HEAD
        name: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
=======
        name: { type: String, required: true },
        desc: { type: String},
>>>>>>> f6c7004d5c0f238ee6b12a1d215078c8001e545f
        img: { type: String },
        isFamous: { type: Boolean, required: true, default: false },
        region: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Place', placeSchema);
