const express = require('express');
<<<<<<< HEAD
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cors = require('cors');
=======
>>>>>>> c4c6f16b1c8bfc21032b685bca8d7c2871d1307d
const path = require('path');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

const route = require('./routes');
const db = require('./config/db');

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));
<<<<<<< HEAD
app.use(expressLayouts);
app.set('layout', 'layouts/header-layout'); // set custom default layout

// static files
app.use(express.static(path.join(__dirname, 'public')));
=======
>>>>>>> c4c6f16b1c8bfc21032b685bca8d7c2871d1307d

// connect to DB
db.connect();

// middleware: parse body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// middleware: override with POST having ?_method=DELETE/PUT
app.use(methodOverride('_method'));

// middleware: cors
app.use(cors());

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
