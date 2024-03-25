const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/DashboardController');

router.get('/',authMiddleware , async (req, res, next) => {
    await dashboardController.getIndex(req, res, next);
});
module.exports = router;
