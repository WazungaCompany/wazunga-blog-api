const usersRouter = require("express").Router();
const {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
} = require("../controllers/users");

usersRouter.route('/')
    .get(getUsers)
    .post(addUser)
    .put(updateUser)
    .delete(deleteUser);

usersRouter.post('/login', loginUser);

module.exports = usersRouter;
