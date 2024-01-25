const mongoose = require('mongoose');

const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connect successfully!');
        })
        .catch((err) => console.log('Error connecting to Mongoose server'));
};

module.exports = { connect };
