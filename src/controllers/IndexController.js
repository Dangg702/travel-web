const Place = require('../models/Place');

// Function to handle the home page route
const getIndex = async (req, res, next) => {
    try {
        const { perPage, page } = getPageParams(req.params.page);

        const places = await getPlaces(perPage, page);
        const count = await getPlaceCount();
        const totalPages = Math.ceil(count / perPage);

        renderPlaceIndex(res, places, page, totalPages);
    } catch (err) {
        next(err);
    }
};

// Function to handle the pagination route
const getList = async (req, res, next) => {
    try {
        const { perPage, page } = getPageParams(req.params.page);

        const places = await getPlaces(perPage, page);
        const count = await getPlaceCount();
        const totalPages = Math.ceil(count / perPage);

        renderPlaceIndex(res, places, page, totalPages);
    } catch (err) {
        next(err);
    }
};

// Helper function to extract pagination parameters
const getPageParams = (pageParam) => {
    const perPage = 16;
    const page = pageParam || 1;
    return { perPage, page };
};

// Helper function to retrieve places
const getPlaces = async (perPage, page) => {
    return await Place.find()
        .skip((perPage * page) - perPage)
        .limit(perPage);
};

// Helper function to retrieve total product count
const getPlaceCount = async () => {
    return await Place.countDocuments();
};

// Helper function to render the product index view
const renderPlaceIndex = (res, places, currentPage, totalPages) => {
    res.render('component/home', {
        places,
        current: currentPage,
        pages: totalPages
    });
};

module.exports = { getIndex, getList };
