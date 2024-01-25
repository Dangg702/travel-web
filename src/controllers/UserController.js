const User = require('../models/User');

class UserController {
    // PUT /api/user/update-user/:id
    updateUser(req, res, next) {
        const userId = req.params.id;
        const updateData = req.body;
        User.findByIdAndUpdate(userId, updateData, { new: true })
            .then((updateUser) => res.status(200).json({ message: 'User updated successfully', data: updateUser }))
            .catch(next);
    }

    // DELETE /api/user/delete-user/:id
    deleteUser(req, res, next) {
        const userId = req.params.id;
        User.findByIdAndDelete(userId)
            .then(() => res.status(200).json({ message: 'User deleted successfully' }))
            .catch(next);
    }

    // GET /api/user/get-all
    getAllUsers(req, res, next) {
        User.find().then((allUsers) => {
            if (allUsers.length < 0) {
                return res.status(404).json({ message: 'No user' });
            }
            res.status(200).json({ message: 'Success', data: allUsers });
        });
    }

    // GET /api/user/get-user/:name
    getUser(req, res, next) {
        const userName = req.params.name;
        User.find({ name: userName })
            .then((user) => {
                console.log(user);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                } else {
                    res.status(200).json({ message: 'Success', data: user });
                }
            })
            .catch(next);
    }
}

module.exports = new UserController();
