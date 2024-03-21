const Tour = require('../models/Tour');
class TourController {
    async show(req, res, next) {
        try {
            return res.json({ message: 'TourController' });
        } catch (err) {
            next(err);
        }
    }

    // POST api/tour/add-tour
    async addTour(req, res, next) {
        try {
            const existingTour = await Tour.findOne({ name: req.body.name });

            if (existingTour) {
                return res.json({ message: 'Tour already exists' });
            } else {
                const newTour = new Tour(req.body);
                const savedTour = await newTour.save();
                return res.json({ message: 'Tour created successfully', data: savedTour });
            }
        } catch (err) {
            next(err);
        }
    }

    // PUT api/tour/edit-tour/:id
    async editTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const updateData = req.body;
            const tour = await Tour.findByIdAndUpdate(tourId, updateData, { new: true });
            if (!tour) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                return res.status(200).json({ message: 'Edit tour successfully', data: tour });
            }
        } catch (err) {
            next(err);
        }
    }
    // DELETE api/tour/delete-tour/:id
    async deleteTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const tour = await Tour.findByIdAndDelete(tourId);
            if (!tour) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                return res.status(200).json({ message: 'Delete place successfully' });
            }
        } catch (err) {
            next(err);
        }
    }

    // GET api/tour/get-tour/:name
    async getTour(req, res, next) {
        try {
            const tourName = req.params.name;
            const tour = await Tour.find({ name: tourName }).populate('placeData');
            console.log('get Tour', tour);
            if (tour) {
                res.render('tour-detail', {
                    cssLink: '/css/tourDetail.css',
                    message: 'Success',
                    tour: tour[0],
                });
            } else {
                return res.status(404).json({ message: 'No tour found' });
            }
        } catch (err) {
            next(err);
        }
    }

    async searchTours(req, res, next) {
        try {
            const tourName = req.params.name;
            let queryConditions = {}; // Biến trung gian để lưu điều kiện truy vấn
            if (req.query.date) {
                queryConditions.dateGo = req.query.date;
            }
            if (req.query.departure) {
                queryConditions.departure = req.query.departure;
            }
            const tour = await Tour.find({
                name: { $regex: tourName, $options: 'i' },
                // dateGo: tourDate,
                // departure: tourDeparture,
                ...queryConditions, // Sử dụng toán tử spread để thêm các điều kiện vào truy vấn
            }).populate('placeData');

            if (tour.length === 0) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                return res.status(200).json({ message: 'Success', data: tour });
            }
        } catch (err) {
            next(err);
        }
    }

    // GET api/tour/all-tours
    async getAll(req, res, next) {
        try {
            const tours = await Tour.find();
            if (!tours) {
                res.status(404).json({ message: 'No tour found' });
                res.render('404', { layout: false });
            } else {
                res.render('tours', {
                    layout: 'layouts/sidebar-layout',
                    cssLink: '/css/tours.css',
                    tours,
                });
            }
        } catch (err) {
            res.render('500', { layout: false });
        }
    }
    // GET api/tour/latest-tours
    async getLatestTours(req, res, next) {
        try {
            const limitNumber = 15;
            const tours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber);
            if (!tours) {
                // res.status(404).json({ message: 'No tour found' });
                res.render('404', { layout: false });
            } else {
                res.render('tours', {
                    layout: 'layouts/sidebar-layout',
                    cssLink: '/css/tours.css',
                    tours,
                });
            }
        } catch (err) {
            res.render('500', { layout: false });
        }
    }
    // GET api/tour/:region
    async fillerRegion(req, res, next) {}
    // GET api/tour/create-tour
}

module.exports = new TourController();
