const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/fauturecomp.controller");

let feautureCompRouter = Router();

feautureCompRouter.get("/", getAll);
feautureCompRouter.get("/:id", getById);
feautureCompRouter.delete("/:id", remove);
feautureCompRouter.patch("/:id", update);
feautureCompRouter.post("/create", create);

module.exports = feautureCompRouter;
