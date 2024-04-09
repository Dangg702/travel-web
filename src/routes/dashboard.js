const express = require('express');
const router = express.Router();
const { authMiddleware, authenticateToken } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/DashboardController');

router.get('/', authMiddleware, authenticateToken, dashboardController.getIndex);
module.exports = router;
