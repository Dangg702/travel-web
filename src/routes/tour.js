const express = require('express');
const router = express.Router();

const tourController = require('../controllers/TourController');

router.get('/book-tour/:id', tourController.showBookTour);

router.post('/add-tour', tourController.addTour);
router.put('/edit-tour/:id', tourController.editTour);
router.delete('/delete-tour/:id', tourController.deleteTour);
router.get('/get-tour/:name', tourController.getTour);
router.get('/all-tours', tourController.getAll);
router.get('/latest-tours', tourController.getLatestTours);
router.get('/', tourController.show);

module.exports = router;
