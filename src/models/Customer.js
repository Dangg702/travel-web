const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String, required: true, unique: true },
        phone: { type: String },
        address: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Customer', userSchema);