const router = require("express").Router();
const todosController = require("../../controllers/todosController");

// Matches with "/api/books"
router.route("/")
  .get(todosController.findAll)
  .post(todosController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(todosController.findById)
  .put(todosController.update)
  .delete(todosController.remove);

module.exports = router;
