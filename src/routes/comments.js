const commentsRouter = require("express").Router();
const {
    addComment
} = require("../controllers/comments");

commentsRouter.route("/")
    .post(addComment);

module.exports = commentsRouter;
