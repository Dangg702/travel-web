const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', userSchema);
