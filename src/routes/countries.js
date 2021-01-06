const countryRouter = require("express").Router();
const {
    addCountry,
    getCountry,
    updateCountry,
    deleteCountry,
} = require("../controllers/country");

countryRouter.route('/')
    .get(getCountry)
    .post(addCountry)
    .put(updateCountry)
    .delete(deleteCountry);


module.exports = countryRouter;
