const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');
const indexRouter = require('./site');
const searchRouter = require('./site');
function route(app) {
    app.use('/api/place', placeRouter);
    app.use('/api/user', userRouter);
<<<<<<< HEAD
    app.use('/user', authRouter);
    app.use('/', getIndex);
    app.use('/list/:page', getList);
=======
    app.use('/api', authRouter);
    // Define routes
    // app.use('/list/:page/',searchRouter);
    app.use('/', indexRouter);
>>>>>>> c4c6f16b1c8bfc21032b685bca8d7c2871d1307d
}

module.exports = route;
