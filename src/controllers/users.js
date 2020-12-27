const User = require("../models/users");
const { validationError } = require("../utils/mongooseErrorsHandler");
const { successRequest, badRequest } = require("../utils/reponsesHandler");

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
      const error = validationError(err);
      return badRequest(res, error);
    }
    return successRequest(res, newUser);
  });
};
