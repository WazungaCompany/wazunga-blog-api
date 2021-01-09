const Comment = require("../models/comments");
const { validationError } = require("../utils/mongooseErrorsHandler");
const { existsRegister } = require("../utils/mongooseQueryHelper");
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require("../utils/reponsesHandler");

/** Para agregar un comentario se reciben las propiedades
 * de este atraves del body.
 * @param {Request} req
 * @param {Response} res
 */
exports.addComment = function(req, res) {
    const comment = req.body;
    Comment.create(comment, (err, newComment) => {
        if (err) {
            console.log(err.MongoError);
            const error = validationError(err);
            return badResponse(res, error);
        }
        return successResponse(res, newComment);
    });
}

/** Obtener todos los comentarios de un post, es necesario que el id del
 * post se reciba en los parametros
 * @param {Request} req
 * @param {Response} res
 */
exports.getCommentsByPost = function(req, res) {
    const { comment_post } = req.params;
    if (!comment_post)
        return badResponse(res, { comment_post: {
            msg: 'No se recibio el id del post'
        } });
    Comment.find({ comment_post: comment_post }, (err, comments) => {
        if (!comments)
            return notFoundResponse(
                res, 
                `Comments for post -> ${comment_post}`
            );
        if (err)
            return internalServerErrorResponse(res, err);
        return successResponse(res, comments);
    });
}

/** Actualizar un usuario, es necesario que en req.body se envie la propiedad
 * comment_id, de lo contrario no se podra ejecutar la funcion update
 * @param {Request} req
 * @param {Response} res
 * TODO
 */
exports.updateComment = function(req, res) {
    return ;
}

/** Eliminar un usuario, es necesario que en req.body se envie la propiedad
 * usuario_id, de lo contrario no se podra ejecutar la funcion delete.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteComment = async function(req, res) {
    const comment = req.body;
    const { _id } = comment;
    if(!_id)
        return badResponse(
            res, 
            { comment_id: { msg: 'No se recibio el id del commentario'} 
            });
    const commentExists = await existsRegister(Comment, _id);
    if(!commentExists)
        return notFoundResponse(res, `Comment -> ${_id}`);
    comment.comment_status = false;
    Comment.findByIdAndUpdate(_id, comment, { new: true }, (err, result) => {
        if (err)
            return internalServerErrorResponse(res, err);
        return successResponse(res, result);
    });
}
