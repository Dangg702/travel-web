const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema(
    {
        title: { type: String, required: true, unique: true},
        imgUrl: { type: String, required: true },
        desc: { type: String, required: true },
        contentHtml: { type: String},
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Blogs', blogsSchema);
