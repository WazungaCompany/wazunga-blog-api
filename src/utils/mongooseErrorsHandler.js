const { Error } = require("mongoose");
let error = {};

/**
 * Cuando se dispare un error en los validators de cualquier field
 * del Mongoose.Schema, se manajera atra vez de esta funcion, asi mismo
 * se hara retornara un objeto con un msg y el kind.
 * @param {Error.ValidationError} err
 * @returns {Object} error: Error message
 */
exports.validationError = function(err) {
  switch (err.name) {
    case "ValidationError":
      let path = "";
      for (field in err.errors) {
        const fieldProps = err.errors[field];
        switch (fieldProps.kind) {
          // TODO: Se debn agregar los mensaje de error de manera mas
          // personalizada
          case "minlength":
            path = fieldProps.path;
            error = {
              ...error,
              [path]: {
                msg: fieldProps.message,
                kind: fieldProps.kind,
              }
            };
            break;
          case "required":
            path = fieldProps.path;
            error = {
              ...error,
              [path]: {
                msg: fieldProps.message,
                kind: fieldProps.kind,
              }
            };
            break;
          case "user defined":
            path = fieldProps.path;
            error = {
              ...error,
              [path]: {
                msg: fieldProps.message,
                kind: fieldProps.kind,
              }
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
