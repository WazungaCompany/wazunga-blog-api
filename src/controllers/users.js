const User = require("../models/users");
const { validationError } = require("../utils/mongooseErrorsHandler");
const { 
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require("../utils/reponsesHandler");

/** Para agregar un usuario se reciben las propiedades
 * de este atraves del body.
 * TODO: Se deben agregar validaciones en las propiedades
 * @param {Request} req
 * @param {Response} res
 */
exports.addUser = function (req, res) {
    const user = req.body;
    User.create(user, (err, newUser) => {
        if (err) {
            console.log(err.errors);
            const error = validationError(err);
            return badResponse(res, error);
        }
        return successResponse(res, newUser);
    });
};

/** Obtener todos los usuarios
 * @param {Request} req
 * @param {Response} res
 */
exports.getUsers = function (req, res) {
    User.find((err, users) => {
        if (err)
            return internalServerErrorResponse(res, err);
        if (users.length < 1)
            return notFoundResponse(res, 'Users');
        return successResponse(res, users);
    });
}
