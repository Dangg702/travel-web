const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const userController = require('../controllers/UserController');

router.put('/update-user/:id', authMiddleware, userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/get-user/:name', authMiddleware, userController.getUser);
router.get('/get-all', authMiddleware, userController.getAllUsers);

module.exports = router;
