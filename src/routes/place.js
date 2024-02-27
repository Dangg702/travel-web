const express = require('express');
const router = express.Router();

const placeController = require('../controllers/PlaceControler');

router.post('/add-place', placeController.addPlace);
router.put('/edit-place/:id', placeController.editPlace);
router.delete('/delete-place/:id', placeController.deletePlace);
router.post('/search-place/:name', placeController.searchPlace);
router.get('/search-place/', placeController.searchForm);

module.exports = router;
