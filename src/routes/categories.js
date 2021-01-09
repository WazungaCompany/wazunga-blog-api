const categoryRouter = require("express").Router();
const {
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categories");

categoryRouter.route('/')
    .get(getCategory)
    .post(addCategory)
    .put(updateCategory)
    .delete(deleteCategory);


module.exports = categoryRouter;