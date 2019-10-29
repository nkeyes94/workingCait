const router = require("express").Router();
const todoRoutes = require("./todos");

// Book routes
router.use("/todos", todoRoutes);

module.exports = router;
