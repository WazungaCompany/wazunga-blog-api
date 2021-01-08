const Country = require("../models/countries");
const { validationError } = require("../utils/mongooseErrorsHandler");
const { existsRegister } = require("../utils/mongooseQueryHelper");
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require("../utils/reponsesHandler");


/** Para agregar un Pais se reciben las propiedades
 * de este atraves del body.
 * @param {Request} req
 * @param {Response} res
 */exports.addCountry = function(req, res) {
    const country = req.body;
    Country.create(country, (err, newCountry) => {
        if (err) {
            const error = validationError(err);
            return badResponse(res, error);
        }
        return successResponse(res, newCountry);
    });
};

/** Obtener todos los Paises
 * @param {Request} req
 * @param {Response} res
 */
exports.getCountry = function(req, res) {
    Country.find({ country_status: { $ne: false } }, (err, country) => {
        if (err)
            return internalServerErrorResponse(res, err);
        if (country.length < 1)
            return notFoundResponse(res, 'Country');
        return successResponse(res, country);
    });
}

/** Actualizar un Pais, es necesario que en req.body se envie la propiedad
 * pais_id, de lo contrario no se podra ejecutar la funcion update
 * @param {Request} req
 * @param {Response} res
 */

exports.updateCountry = async function(req, res) {
    const nCountry = req.body;
    // Verificar si el req.body contiene las propiedades del Country
    if (Object.keys(nCountry).length <= 1 || nCountry.constructor === {})
        return badResponse(res, { country: { msg: 'No fueron enviados los parametros necesarios' } });
    const { country_id } = nCountry;

    // Verificar si el id del country fue enviado
    if (!country_id)
        return badResponse(res, { country_id: { msg: 'No se recibio el id del pais' } });
    const countryExists = await existsRegister(Country, country_id);

    // Verificar si el country existe
    if (!countryExists)
        return notFoundResponse(res, `Country -> ${country_id}`);

    // Adding updating date
    nCountry.country_updated_at = new Date();
    Country.findByIdAndUpdate(country_id, nCountry, { new: true }, (err, result) => {
        if (err)
            return internalServerErrorResponse(res, err);

        // Enviar el usuario actualizado
        return successResponse(res, result);
    });
}

/** Eliminar un pais, es necesario que en req.body se envie la propiedad
 * pais_id, de lo contrario no se podra ejecutar la funcion delete.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteCountry = async function(req, res) {
    const country = req.body;
    const { country_id } = country; 
    // Verificar si el id del pais fu enviado
    if (!country_id)
        return badResponse(res, { country_id: { msg: 'No se recibio el id del pais' } });
    const countryExists = await existsRegister(Country, country_id);
    // Verificar si el pais existe
    if (!countryExists)
        return notFoundResponse(res, `Country -> ${country_id}`);
    country.country_status = false;
    Country.findByIdAndUpdate(country_id, country, { new: true }, (err, result) => {
        if (err)
            return internalServerErrorResponse(res, err);
        console.log(result);
        // Enviar el country se elimino
        return successResponse(res, result);
    });
}

