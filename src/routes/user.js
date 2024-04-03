const express = require('express');
const router = express.Router();
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

const userController = require('../controllers/UserController');

router.get('/edit-form/:id', authMiddleware, userController.editForm);
router.put('/update-user/:id', authMiddleware, userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/get-user/:name', authUserMiddleware, userController.getUser);
router.get('/get-all', authMiddleware, userController.getAllUsers);
router.post('/refresh-token', userController.refreshToken);
router.get('/manage', authMiddleware, userController.userPage);
module.exports = router;
