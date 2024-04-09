const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const placeController = require('../controllers/PlaceController');

router.post('/add-place', placeController.addPlace);
router.get('/edit-place/', placeController.editForm);
router.put('/edit-place/:id', placeController.editPlace);
router.get('/delete-place/', placeController.deleteForm);
router.delete('/delete-place/:id', placeController.deletePlace);
router.get('/search-place/:name', placeController.searchPlace);
router.get('/search-place/', placeController.searchForm);
router.get('/all-place/', placeController.getAllPlace);
router.get('/add-place', authenticateToken, placeController.createForm);
router.get('/edit-place/:id', placeController.editForm);
router.get('/place-data', authenticateToken,placeController.placeTable);

module.exports = router;
