const { model } = require("mongoose");

/** Buscar un registro dentro de una coleccion, ese necesario enviar un 
 * Mongoose.Schema para poder hacer la busqueda mediante el id de un registro
 * del mismo.
 * @param {any} model: Mongoose model para buscar el registro en la coleccion
 * @param {String} id: ID del registro 
 * @returns {Boolean} exists
 */
exports.existsRegister = function(model, id) {
    model.findById(id, (err, result) => {
        return result ? true : false;
    }); 
}
