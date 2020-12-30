const usersRouter = require("express").Router();
const { addUser, getUsers, updateUser, deleteUser } = require("../controllers/users");

usersRouter.route('/')
    .get(getUsers)
    .post(addUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = usersRouter;
