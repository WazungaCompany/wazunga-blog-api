const commentsRouter = require("express").Router();
const {
    addComment,
    getCommentsByPost,
    deleteComment
} = require("../controllers/comments");

commentsRouter.route("/")
    .post(addComment)
    .delete(deleteComment);

commentsRouter.route("/:post")
    .get(getCommentsByPost);

module.exports = commentsRouter;
