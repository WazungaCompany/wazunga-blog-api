const router = require("express").Router();
const usersRouter = require("./users");

router.get('/', (req, res) => {
  res.send("<h1> Welcome to wazunga blog API </h1>")
});

module.exports = {
  routes: router,
  usersRoutes: usersRouter
}