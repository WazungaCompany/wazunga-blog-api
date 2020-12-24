const usersRouter = require("express").Router();
const { addUser} = require("../controllers/users");

usersRouter.post('/', addUser);

module.exports = usersRouter;