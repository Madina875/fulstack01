const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/model.controller");

let modelRouter = Router();

modelRouter.get("/", getAll);
modelRouter.get("/:id", getById);
modelRouter.delete("/:id", remove);
modelRouter.patch("/:id", update);
modelRouter.post("/create", create);

module.exports = modelRouter;
