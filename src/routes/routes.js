const router = require("express").Router();
const usersRouter = require("./users");
const countriesRouter = require("./countries");
const categoriesRouter = require("./categories");

router.get('/', (req, res) => {
    res.send({
        msg: 'Welcome to wazunga-blog-api'
    })
});

module.exports = {
    routes: router,
    usersRoutes: usersRouter,
    countriesRoutes: countriesRouter,
    categoriesRoutes: categoriesRouter
}
