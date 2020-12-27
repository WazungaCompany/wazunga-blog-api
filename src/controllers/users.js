const User = require("../models/users");
const { successRequest, badRequest } = require("../utils/reponsesHandler");

/** Para agregar un usuario se reciben las propiedades
 * de este atraves del body.
 * TODO: Se deben agregar validaciones en las propiedades
 */
exports.addUser = function (req, res) {
    const user = req.body;
    User.create(user, (error, newUser) => {
        if (error)
            return badRequest(res, error.errors.user_name.properties.message);
        return successRequest(res, newUser);
    })
}
