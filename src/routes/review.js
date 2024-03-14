const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/ReviewController');

router.post('/add-review', reviewController.addReview);
router.put('/edit-review/:id', reviewController.editReview);
router.delete('/delete-review/:id', reviewController.deleteReview);
router.get('/get-review/:name', reviewController.getReview);

module.exports = router;