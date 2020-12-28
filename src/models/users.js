const db = require("../config/db");

/** Aqui se define la estructura de la coleccion (tabla), cada 
 * propiedad del objeto representa un atributo de la coleccion.
 * Forma corta de crear un atributo `campo: TipoDato`
 * Forma larga de crear un atributo `campo: { propieda1: 'valor', porpiedadn: 'valorn'}`
 * TODO: Agregar propiedaddes faltantes y validaciones
 */
const userSchema = new db.Schema({
    user_name: {
        type: String,
        minlength: 3,
        required: true
    },
    user_lastname: {
        type: String,
        minlength: 3,
        required: true
    },
    user_created_at: { type: Date, default: Date.now }
});

module.exports = db.mongoose.model('users', userSchema);
