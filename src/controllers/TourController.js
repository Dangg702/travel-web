const Tour = require('../models/Tour');

class TourController {
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
    createForm(req, res, next) {
        res.render('create-tour', { layout: 'layouts/dashboard-layout' });
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
            const tour = await Tour.find({ name: { $regex: tourName, $options: 'i' } });
            if (tour.length === 0) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                return res.status(200).json({ message: 'Success', data: tour });
            }
        } catch (err) {
            next(err);
        }
    }

    // GET api/tour/all-tour
    async getAll(req, res, next) {
        try {
            const tours = await Tour.find();
            if (!tours) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                return res.status(200).json({ message: 'Success', data: tours });
            }
        } catch (err) {
            next(err);
        }
    }

    // còn lỗi
    async getAllTour(req, res, next) {
        try {
            const { sort, filter } = req.query;
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;

            if (filter) {
                const objectFilter = {};
                objectFilter[filter[0]] = filter[1];
                const tours = await Tour.find({ [filter[0]]: { $regex: filter[1] } })
                    .limit(limit)
                    .skip((page - 1) * limit);

                if (tours.length === 0) {
                    return res.status(404).json({ message: 'Empty' });
                }

                const totalTours = await Tour.countDocuments();
                return res.status(200).json({
                    message: 'Success',
                    data: tours,
                    currentPage: page,
                    totalPlaces: totalTours,
                    totalPages: Math.ceil(totalTours / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const tours = await Tour.find()
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort(objectSort);

                if (tours.length === 0) {
                    return res.status(404).json({ message: 'Empty' });
                }

                const totalTours = await Tour.countDocuments();
                return res.status(200).json({
                    message: 'Success',
                    data: tours,
                    currentPage: page,
                    totalPlaces: totalPlaces,
                    totalPages: Math.ceil(totalTours / limit),
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TourController();
