const { model } = require("mongoose");

/** Buscar un registro dentro de una coleccion, ese necesario enviar un 
 * Mongoose.Schema para poder hacer la busqueda mediante el id de un registro
 * del mismo.
 * @param {any} model: Mongoose model para buscar el registro en la coleccion
 * @param {String} id: ID del registro 
 * @returns {Boolean}
*/
exports.existsRegister = async function(model, id) {
    const exists  = await model.findById(id); 
    return exists ? true : false;
}
