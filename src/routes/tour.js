const express = require('express');
const router = express.Router();

const tourController = require('../controllers/TourController');

router.post('/add-tour', tourController.addTour);
router.put('/edit-tour/:id', tourController.editTour);
router.delete('/delete-tour/:id', tourController.deleteTour);
router.get('/get-tour/:name', tourController.getTour);
router.get('/all-tour/', tourController.getAll);

module.exports = router;
