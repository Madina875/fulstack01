const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/fautures.controller");

let feauturesRouter = Router();

feauturesRouter.get("/", getAll);
feauturesRouter.get("/:id", getById);
feauturesRouter.delete("/:id", remove);
feauturesRouter.patch("/:id", update);
feauturesRouter.post("/create", create);

module.exports = feauturesRouter;
