const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        phoneNumber: { type: String },
        email: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', userSchema);
