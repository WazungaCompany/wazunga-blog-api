const router = require("express").Router();
const usersRouter = require("./users");

router.get('/', (req, res) => {
    res.send({
        msg: 'Welcome to wazunga-blog-api'
    })
});

module.exports = {
    routes: router,
    usersRoutes: usersRouter
}
