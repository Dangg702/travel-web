const express = require('express');
const router = express.Router();

const searchController = require('../controllers/SearchController');
const indexController = require('../controllers/IndexController');

router.get('/list/:page', async (req, res, next) => {
    await indexController.getList(req, res, next);
});
router.get('/search/:name', searchController.getPlace);
router.get('/search', searchController.searchPlace);
router.get('/', async (req, res, next) => {
    await indexController.getIndex(req, res, next);
});
module.exports = router;
