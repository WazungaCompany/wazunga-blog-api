const usersRouter = require("express").Router();
const { addUser, getUsers } = require("../controllers/users");

usersRouter.route('/')
    .get(getUsers)
    .post(addUser);

module.exports = usersRouter;
