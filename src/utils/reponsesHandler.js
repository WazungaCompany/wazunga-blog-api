const { 
    SUCCESS_CODES,
    CLIENT_ERROR_CODES,
    SERVER_ERROR_CODES
} = require("../data/constants");

/**
 * Retorna una response con un SUCCESS_CODES.ok (200), de igual manera se
 * retorna el resultado (result) de la request. Se debe usar cuando la request
 * se ejecute con exito.
 * @param {Response} res 
 * @param {any} result
 */
exports.successRequest = function (res, result) {
    res.status(SUCCESS_CODES.ok).send({
        status_code: res.statusCode,
        result
    });
}

/**
 * Retorna una response con un CLIENT_ERROR_CODES.bad_request (401), 
 * de igual manera se retorna el resultado (result) de la request. Se debe usar 
 * cuando los parametros enviados no sean correctos.
 * @param {Response} res 
 * @param {String} msg
 */
exports.badRequest = function(res, msg) {
    res.status(CLIENT_ERROR_CODES.bad_request).send({
        status_code: res.statusCode,
        msg
    });
}