const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');

router.get('/list/:page', async (req, res, next) => {
    await indexController.getIndex(req, res, next);
});

router.get('/contact', indexController.getContact);
router.get('/', indexController.getIndex);
module.exports = router;
