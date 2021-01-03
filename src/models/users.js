const db = require("../config/db");
const isAnEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const emailValidators = [
    {
        validator: function(value) {
            return isAnEmail.test(value);
        },
        message: 'Email no valido'
    },
    {
        validator: async function(value) {
            const exists = await User.findOne({ user_email: value });
            return !exists ? true : false;
        },
        message: 'Email ya existe'
    }
]

const usernameValidators = {
    validator: async function(value) {
        const exists = await User.findOne({ user_username: value });
        return !exists ? true : false;
    },
    message: 'Username ya existe'
}
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
    user_email: {
        type: String,
        required: true,
        validate: emailValidators
    },
    user_birthdate: {
        type: Date,
        required: true
    },
    user_description: {
        type: String,
        maxlength: 250,
        minlength: 10,
        required: true
    },
    user_username: {
        type: String,
        maxlength: 25,
        minlength: 5,
        required: true,
        validate: usernameValidators
    },
    user_password: {
        type: String,
        maxlength: 100,
        required: true
    },
    user_status: { type: Boolean, default: true },
    user_created_at: { type: Date, default: Date.now },
    user_updated_at: { type: Date, default: Date.now }
});

const User = db.mongoose.model('users', userSchema);
module.exports = User;
