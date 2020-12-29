const usersRouter = require("express").Router();
const { addUser, getUsers, updateUser } = require("../controllers/users");

usersRouter.route('/')
    .get(getUsers)
    .post(addUser)
    .put(updateUser);

module.exports = usersRouter;
