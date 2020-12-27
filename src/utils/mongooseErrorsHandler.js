const { Error } = require("mongoose");

/**
 * Cuando se dispare un error en los validators de cualquier field
 * del Mongoose.Schema, se manajera atra vez de esta funcion, asi mismo
 * se hara retornara un objeto con un msg y el kind.
 * @param {Error.ValidationError} err
 * @returns {Object} error: Error message
 */
exports.validationError = function (err) {
  let error = undefined;
  switch (err.name) {
    case "ValidationError":
      for (field in err.errors) {
        const fieldProps = err.errors[field];
        switch (fieldProps.kind) {
          // TODO: Se debn agregar los mensaje de error de manera mas
          // personalizada
          case "minlength":
            error = {
              msg: err.errors[field].message,
              kind: err.errors[field].kind,
            };
            break;
        }
      }
      break;
    default:
      break;
  }
  return error;
};
