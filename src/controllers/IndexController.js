const Place = require('../models/Place');

class IndexController {
    async getIndex(req, res, next) {
        const limitNumber = 6;
        const places = await Place.find().limit(limitNumber);
        const latestPlace = await Place.find().sort({ createdAt: -1 }).limit(limitNumber);
        const tours = { latestPlace };

        res.render('home', {
            cssLink: '/css/home.css',
            places,
            tours,
        });

        // res.render('500', { layout: false });
    }

    // // Function to handle the home page route
    // async getIndex(req, res, next) {
    //     try {
    //         const { perPage, page } = this.getPageParams(req.params.page);

    //         const places = await this.getPlaces(perPage, page);
    //         const count = await this.getPlaceCount();
    //         const totalPages = Math.ceil(count / perPage);

    //         this.renderPlaceIndex(res, places, page, totalPages);
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // // Function to handle the pagination route
    // async getList(req, res, next) {
    //     try {
    //         const { perPage, page } = this.getPageParams(req.params.page);

    //         const places = await this.getPlaces(perPage, page);
    //         const count = await this.getPlaceCount();
    //         const totalPages = Math.ceil(count / perPage);

    //         this.renderPlaceIndex(res, places, page, totalPages);
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // // Helper function to extract pagination parameters
    // getPageParams(pageParam) {
    //     const perPage = 16;
    //     const page = pageParam || 1;
    //     return { perPage, page };
    // }

    // // Helper function to retrieve places
    // async getPlaces(perPage, page) {
    //     return await Place.find()
    //         .skip(perPage * page - perPage)
    //         .limit(perPage);
    // }

    // // Helper function to retrieve total product count
    // async getPlaceCount() {
    //     return await Place.countDocuments();
    // }

    // // Helper function to render the product index view
    // renderPlaceIndex(res, places, currentPage, totalPages) {
    //     res.render('home', {
    //         cssLink: '/css/home.css',
    //         places,
    //         current: currentPage,
    //         pages: totalPages,
    //     });
    // }
}

module.exports = new IndexController();
