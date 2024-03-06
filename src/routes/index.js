const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');
const indexRouter = require('./site');
const searchRouter = require('./site');
const dashboardRouter = require('./dashboard');

function route(app) {
    app.use('/api/place', placeRouter);
    app.use('/api/user', userRouter);
    app.use('/user', authRouter);
    // Define routes
    // app.use('/list/:page/',searchRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/', indexRouter);
}

module.exports = route;
