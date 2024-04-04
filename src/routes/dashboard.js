const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/DashboardController');

router.get('/', authMiddleware, dashboardController.getIndex);
module.exports = router;
