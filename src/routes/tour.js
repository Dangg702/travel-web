const express = require('express');
const router = express.Router();

const tourController = require('../controllers/TourController');
const reviewsController = require('../controllers/reviewController');
const reviewController = require('../controllers/reviewController');

// router.post('/search-tours', tourController.search);
router.post('/add-tour', tourController.addTour);
router.put('/edit-tour/:id', tourController.editTour);
router.delete('/delete-tour/:id', tourController.deleteTour);
router.get('/create-tour', tourController.createForm);
router.get('/get-tour/:id', tourController.getTour);
router.get('/search-tours/:name', tourController.searchTours);
router.get('/all-tours', tourController.getAll);
router.get('/latest-tours', tourController.getLatestTours);
router.get('/:region', tourController.fillerRegion);
router.get('/', tourController.show);

module.exports = router;
