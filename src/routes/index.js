const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');
const tourRouter = require('./tour');
const bookingRouter = require('./booking');
const indexRouter = require('./site');
const dashboardRouter = require('./dashboard');
const reviewRouter = require('./review');
const paymentRouter = require('./payment');
const uploadRoute = require('./uploadRoutes');

function route(app) {
    app.use('/api/place', placeRouter);
    app.use('/api/user', userRouter);
    app.use('/api/tour', tourRouter);
    app.use('/user', authRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/api/up', uploadRoute);
    app.use('/api', authRouter);
    app.use('/booking', bookingRouter);
    app.use('/', indexRouter);
    app.use('/api/review',reviewRouter)
    app.use('/api/payment',paymentRouter)
}

module.exports = route;
