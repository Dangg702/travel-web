const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');
const { getIndex, getList } = require('../controllers/IndexController');
function route(app) {
    app.use('/api/place', placeRouter);
    app.use('/api/user', userRouter);
    app.use('/api', authRouter);
    // Define routes
    app.use('/', getIndex);
    app.use('/list/:page', getList);
}

module.exports = route;
