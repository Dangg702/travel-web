const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');

function route(app) {
    app.use('/api/place', placeRouter);
    app.use('/api/user', userRouter);
    app.use('/api', authRouter);
    app.use('/', (req, res) => {
        res.render('home', { title: 'Hello World!', desc: 'Huy cute beos ngaayj', day: 'Thứ bảy' });
    });
}

module.exports = route;
