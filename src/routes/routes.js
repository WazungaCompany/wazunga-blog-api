const router = require("express").Router();
const usersRouter = require("./users");
const countriesRouter = require("./countries");
<<<<<<< HEAD
const commentsRouter = require("./comments");
=======
const categoriesRouter = require("./categories");
>>>>>>> manasestest

router.get('/', (_, res) => {
    res.send({
        msg: 'Welcome to wazunga-blog-api'
    })
});

module.exports = {
    routes: router,
    usersRoutes: usersRouter,
    countriesRoutes: countriesRouter,
<<<<<<< HEAD
    commentsRoutes: commentsRouter
=======
    categoriesRoutes: categoriesRouter
>>>>>>> manasestest
}
