const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');
const tourRouter = require('./tour');
const indexRouter = require('./site');
const searchRouter = require('./site');
const dashboardRouter = require('./dashboard');

function route(app) {
    app.use('/api/place', placeRouter);
    app.use('/api/user', userRouter);
    app.use('/api/tour', tourRouter);
    app.use('/user', authRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/api', authRouter);
    app.use('/', indexRouter);
}

module.exports = route;
