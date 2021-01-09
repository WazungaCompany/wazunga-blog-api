const Category = require("../models/categories");
const { validationError } = require("../utils/mongooseErrorsHandler");
const { existsRegister } = require("../utils/mongooseQueryHelper");
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require("../utils/reponsesHandler");


/** Para agregar una categoria se reciben las propiedades
 * de este atraves del body.
 * @param {Request} req
 * @param {Response} res
 */exports.addCategory = function(req, res) {
    const category = req.body;
    Category.create(category, (err, newCategory) => {
        if (err) {
            const error = validationError(err);
            return badResponse(res, error);
        }
        return successResponse(res, newCategory);
    });
};

/** Obtener todos las Categorias
 * @param {Request} req
 * @param {Response} res
 */
exports.getCategory = function(req, res) {
    Category.find({ category_status: { $ne: false } }, (err, category) => {
        if (err)
            return internalServerErrorResponse(res, err);
        if (category.length < 1)
            return notFoundResponse(res, 'Categories');
        return successResponse(res, category);
    });
}

/** Actualizar una categoria, es necesario que en req.body se envie la propiedad
 * categoria_id, de lo contrario no se podra ejecutar la funcion update
 * @param {Request} req
 * @param {Response} res
 */

exports.updateCategory = async function(req, res) {
    const nCategories = req.body;
    // Verificar si el req.body contiene las propiedades de la Ctegory
    if (Object.keys(nCategories).length <= 1 || nCategories.constructor === {})
        return badResponse(res, { category: { msg: 'No fueron enviados los parametros necesarios' } });
    const { category_id } = nCategories;

    // Verificar si el id de la category fue enviado
    if (!category_id)
        return badResponse(res, { category_id: { msg: 'No se recibio el id de la categoria' } });
    const categoryExists = await existsRegister(Category, category_id);

    // Verificar si la category existe
    if (!categoryExists)
        return notFoundResponse(res, `Category -> ${category_id}`);

    // Adding updating date
    nCategories.category_updated_at = new Date();
    Category.findByIdAndUpdate(category_id, nCategories, { new: true }, (err, result) => {
        if (err)
            return internalServerErrorResponse(res, err);

        // Enviar el usuario actualizado
        return successResponse(res, result);
    });
}

/** Eliminar una category, es necesario que en req.body se envie la propiedad
 * pais_id, de lo contrario no se podra ejecutar la funcion delete.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteCategory = async function(req, res) {
    const category = req.body; 
    const { category_id } = category; 

    // Verificar si el id de la category fue enviado
    if (!category_id)
        return badResponse(res, { category_id: { msg: 'No se recibio el id de la categoria' } });
    const categoryExists = await existsRegister(Category, category_id);

    // Verificar si existe la category
    if (!categoryExists)
        return notFoundResponse(res, `Category -> ${category_id}`);
    category.category_status = false;

    Category.findByIdAndUpdate(category_id, category, { new: true }, (err, result) => {
        if (err)
            return internalServerErrorResponse(res, err);
        console.log(result);
        // Enviar el mensaje category se elimino
        return successResponse(res, result);
    });
}
