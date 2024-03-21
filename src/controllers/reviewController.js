const Review = require('../models/Review');
const User = require('../models/User');
const Tour = require('../models/Tour');

// Controller cho các hoạt động trên collection "reviews"
const reviewController = {
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find();
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createReview: async (req, res) => {
        const review = new Review({
            userId: req.body.userId,
            tourId: req.body.tourId,
            rating: req.body.rating,
            comment: req.body.comment,
            createdAt: req.body.createdAt,
        });
        try {
            const newReview = await review.save();
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getReviewById: async (req, res) => {
        try {
            const review = await Review.findById(req.params.reviewId);
            if (review == null) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getReviewsByTourId: async (req, res) => {
        const tourId = req.params.tourId;

        try {
            const reviews = await Review.find({ tourId });

            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ message: 'No reviews found for this tour' });
            }

            // Lấy thông tin của người dùng và tour
            const userIds = reviews.map((review) => review.userId);
            const tourIds = reviews.map((review) => review.tourId);
            const users = await User.find({ _id: { $in: userIds } });
            const tours = await Tour.find({ _id: { $in: tourIds } });

            const tourImages = tours.map((tour) => tour.img);
            // Render trang searchreview.ejs và truyền dữ liệu
            
            res.render('searchreview', { reviews, users, tours, tourImages });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateReview: async (req, res) => {
        try {
            const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
            if (updatedReview == null) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(updatedReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteReview: async (req, res) => {
        try {
            await Review.findByIdAndDelete(req.params.reviewId);
            res.json({ message: 'Review deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = reviewController;
