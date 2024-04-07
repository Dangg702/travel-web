const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

const indexController = require('../controllers/IndexController');

router.get('/list/:page', async (req, res, next) => {
    await indexController.getIndex(req, res, next);
});

router.get('/contact', authenticateToken, indexController.getContact);
router.get('/', authenticateToken, indexController.getIndex);
module.exports = router;
