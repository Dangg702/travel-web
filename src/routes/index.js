const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');

function route(app) {
    app.use('/api/place', placeRouter);
    app.use('/api/user', userRouter);
    app.use('/api', authRouter);
}

module.exports = route;
