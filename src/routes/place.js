const express = require('express');
const router = express.Router();

const placeController = require('../controllers/PlaceController');

router.post('/add-place', placeController.addPlace);
router.put('/edit-place/:id', placeController.editPlace);
router.delete('/delete-place/:id', placeController.deletePlace);
router.get('/search-place/:name', placeController.searchPlace);
router.get('/search-place/', placeController.searchForm);
router.get('/all-place/', placeController.getAllPlace);
router.get('/add-place', placeController.createForm);
router.get('/edit-place/:id', placeController.editForm);
router.get('/place-data', placeController.placeTable);

module.exports = router;
