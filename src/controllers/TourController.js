const Tour = require('../models/Tour');
const User = require('../models/User');
const review = require('../controllers/reviewController');
const fs = require('fs');
const TourService = require('../services/TourService');

class TourController {
    async show(req, res, next) {
        try {
            return res.json({ message: 'TourController' });
        } catch (err) {
            next(err);
        }
    }
    createForm(req, res, next) {
        res.render('create-tour', { layout: 'layouts/dashboard-layout' });
    }
    async editForm(req, res, next) {
        const tourId = req.params.id;
        const tour = await Tour.findById(tourId);
        if (!tour) {
            res.status(404).json({ message: 'Tour not found' });
        } else {
            res.render('edit-tour', { layout: 'layouts/dashboard-layout', tour });
        }
    }
    // POST api/tour/add-tour
    async addTour(req, res, next) {
        try {
            const newTour = new Tour(req.body);
            await newTour.save();
            const successMessage = 'Tour created successfully';
            res.write(
                '<script>alert("' + successMessage + '"); window.location.href="/api/tour/create-tour";</script>',
            );
            res.end(); // Add this line to end the response
            return;
        } catch (err) {
            console.log(err);
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
                const successMessage = 'Tour updated successfully';
                res.write(
                    '<script>alert("' + successMessage + '"); window.location.href="/api/tour/all-tours";</script>',
                );
                res.end(); // Add this line to end the response
                return;
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
    // GET api/tour/get-tour/:id
    async getTour(req, res, next) {
        try {
            const userId = req.user ? req.user.id : null;
            let user = null;
            if (userId != null) {
                user = await User.findById(userId);
            }
            const tourId = req.params.id;
            const tour = await Tour.find({ _id: tourId }).populate('placeData');
            if (tour) {
                const { reviews, limitReviews } = await review.getReviewsByTourId(tourId);
                res.render('tour-detail', {
                    cssLink: '/css/tourDetail.css',
                    message: 'Success',
                    user,
                    tour: tour[0],
                    reviews,
                    limitReviews,
                });
            } else {
                return res.status(404).json({ message: 'No tour found' });
            }
        } catch (err) {
            next(err);
        }
    }
    // GET api/tour/search-tours/:name
    async searchTours(req, res, next) {
        try {
            const userId = req.user ? req.user.id : null;
            let user = null;
            if (userId != null) {
                user = await User.findById(userId);
            }
            const tourName = req.params.name;
            let queryConditions = {}; // Biến trung gian để lưu điều kiện truy vấn
            if (req.query.dateGo) {
                queryConditions.dateGo = req.query.dateGo;
            }
            if (req.query.departure) {
                queryConditions.departure = req.query.departure;
            }
            const tours = await Tour.find({
                name: { $regex: tourName, $options: 'i' },
                ...queryConditions, // Sử dụng toán tử spread để thêm các điều kiện vào truy vấn
            }).populate('placeData');

            if (tours.length === 0) {
                res.render('tours', {
                    layout: 'layouts/sidebar-layout',
                    cssLink: '/css/tours.css',
                    message: 'Tours không tồn tại',
                    tours,
                    user,
                });
            } else {
                res.render('tours', {
                    layout: 'layouts/sidebar-layout',
                    cssLink: '/css/tours.css',
                    tours,
                    user,
                });
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
                res.render('tours-table', {
                    layout: 'layouts/dashboard-layout',
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
            const userId = req.user ? req.user.id : null;
            let user = null;
            if (userId != null) {
                user = await User.findById(userId);
            }
            const limitNumber = 15;
            const tours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber).populate('placeData');
            if (!tours) {
                res.render('404', { layout: false });
            } else {
                res.render('tours', {
                    layout: 'layouts/sidebar-layout',
                    cssLink: '/css/tours.css',
                    tours,
                    user,
                });
            }
        } catch (err) {
            res.render('500', { layout: false });
        }
    }
    // GET /:region
    async getToursByRegion(req, res, next) {
        try {
            const userId = req.user ? req.user.id : null;
            let user = null;
            if (userId != null) {
                user = await User.findById(userId);
            }
            const region = req.params.region;
            const tours = await Tour.find().populate({
                path: 'placeData',
                match: { region: region },
            });
            if (!tours) {
                res.render('404', { layout: false });
            } else {
                res.render('tours', {
                    layout: 'layouts/sidebar-layout',
                    cssLink: '/css/tours.css',
                    tours,
                    user,
                });
            }
        } catch (error) {
            console.error('Error in getToursByRegion:', error);
            res.render('500', { layout: false });
        }
    }
    // POST api/tour/upload ==> upload ảnh từ ckeditor lên máy chủ
    async uploadCK(req, res, next) {
        try {
            fs.readFile(req.files.upload.path, function (err, data) {
                var newPath = 'D:/PTHTTHNC/travel-api/src/public/img/' + req.files.upload.name;
                fs.writeFile(newPath, data, function (err) {
                    if (err) console.log({ err: err });
                    else {
                        console.log(req.files.upload.originalFilename);
                        //     imgl = '/img/req.files.upload.originalFilename';
                        //     let img = "<script>window.parent.CKEDITOR.tools.callFunction('','"+imgl+"','ok');</script>";
                        //    res.status(201).send(img);

                        let fileName = req.files.upload.name;
                        let url = '/img/' + fileName;
                        let msg = 'Upload successfully';
                        let funcNum = req.query.CKEditorFuncNum;
                        console.log({ url, msg, funcNum });
                        res.status(201).send(
                            "<script>window.parent.CKEDITOR.tools.callFunction('" +
                                funcNum +
                                "','" +
                                url +
                                "','" +
                                msg +
                                "');</script>",
                        );
                    }
                });
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new TourController();
