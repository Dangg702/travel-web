const Review = require('../models/Review');

class ReviewController {
    // POST /api/review/add-review
    async addReview(req, res, next) {
        try {
            const existComment = await Review.findOne({ userId: req.body.userId, comment: req.body.comment });

            if (existComment) {
                return res.json({ message: 'Comments cannot be posted' });
            } else {
                const newReview = new Review(req.body);
                const savedReview = await newReview.save();
                return res.json({ message: 'Comments post successfully', data: savedReview });
            }
        } catch (err) {
            next(err);
        }
    }

    // PUT /api/review/edit-review
    async editReview(req, res, next) {}

    // DELETE /api/review/delete-review
    async deleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const review = await Review.findByIdAndDelete(reviewId);
            if (!review) {
                return res.status(404).json({ message: 'No review found' });
            } else {
                return res.status(200).json({ message: 'Delete review successfully' });
            }
        } catch (err) {
            next(err);
        }
    }

    // GET /api/review/get-review
    async getReview(req, res, next) {}
}
module.exports = new ReviewController();
