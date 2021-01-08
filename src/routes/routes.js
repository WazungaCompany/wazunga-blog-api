const router = require("express").Router();
const usersRouter = require("./users");
const countriesRouter = require("./countries");
const commentsRouter = require("./comments");

router.get('/', (_, res) => {
    res.send({
        msg: 'Welcome to wazunga-blog-api'
    })
});

module.exports = {
    routes: router,
    usersRoutes: usersRouter,
    countriesRoutes: countriesRouter,
    commentsRoutes: commentsRouter
}
