const User = require("../models/users");

/** Para agregar un usuario se reciben las propiedades
 * de este atraves del body.
 * TODO: Se deben agregar validaciones en las propiedades
 */
exports.addUser = function (req, res) {
  const user = req.body;
  User.create(user, (err, result) => {
    res.status(200).send({
      status_code: res.statusCode,
      result
    })
  })
}