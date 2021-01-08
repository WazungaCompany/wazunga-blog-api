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
