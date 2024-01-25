const express = require('express');
const router = express.Router();

const placeController = require('../controllers/PlaceControler');

router.post('/add-place', placeController.addPlace);
router.put('/edit-place/:id', placeController.editPlace);
router.delete('/delete-place/:id', placeController.deletePlace);
router.get('/search-place/:name', placeController.searchPlace);

module.exports = router;
