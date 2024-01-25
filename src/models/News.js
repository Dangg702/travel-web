const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        title: { type: String, required: true },
        imgUrl: { type: String },
        desc: { type: String, required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('News', newsSchema);
