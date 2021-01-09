const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const { routes, usersRoutes, countriesRoutes, categoriesRoutes } = require("./routes/routes");

// initialize app
const app = express();

// setup public directory for static content
const publicDir = path.join(__dirname, '../public/uploads');
app.use(express.static(publicDir));

// middlewares region
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

// Permitir cualquier origen para una request
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// define routes
app.use('/', routes);
app.use('/users', usersRoutes);
app.use('/country', countriesRoutes);
app.use('/categories', categoriesRoutes);

module.exports = app;
