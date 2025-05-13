const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/category.controller");

let categoryRouter = Router();

categoryRouter.get("/", getAll);
categoryRouter.get("/:id", getById);
categoryRouter.delete("/:id", remove);
categoryRouter.patch("/:id", update);
categoryRouter.post("/create", create);

module.exports = categoryRouter;
