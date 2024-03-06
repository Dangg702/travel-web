const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/DashboardController');

router.get('/', async (req, res, next) => {
    await dashboardController.getIndex(req, res, next);
});
module.exports = router;
