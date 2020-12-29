const User = require("../models/users");
const { validationError } = require("../utils/mongooseErrorsHandler");
const { existsRegister } = require("../utils/mongooseQueryHelper");
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

/** Actualizar un usuario, es necesario que en req.body se envie la propiedad
 * usuario_id, de lo contrario no se podra ejecutar la funcion update
 * @param {Request} req
 * @param {Response} res
 */
exports.updateUser = async function (req, res) {
    const nUser = req.body;
    // Verificar si el req.body contiene las propiedades del user
    if (Object.keys(nUser).length <= 1 || nUser.constructor === {})
        return badResponse(res, { user: { msg: 'No fueron enviados los parametros necesarios' } });
    const { user_id } = nUser;
    console.log('user_id: ', user_id);
    // Verificar si el id del usuario fu enviado
    if (!user_id)
        return badResponse(res, { user_id: { msg: 'No se recibio el id del usuario' } });
    const userExists = await existsRegister(User, user_id);
    console.log('userExists', userExists);
    // Verificar si el usuario existe
    if (!userExists)
        return notFoundResponse(res, `User -> ${user_id}`); 
    User.findByIdAndUpdate(user_id, nUser, { new: true }, (err, result) => {
        if(err)
            return internalServerErrorResponse(res, err);
        // Enviar el usuario actualizado
        return successResponse(res, result);
    });
}
