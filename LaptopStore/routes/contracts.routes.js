const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/contract.controller");

let contractRouter = Router();

contractRouter.get("/", getAll);
contractRouter.get("/:id", getById);
contractRouter.delete("/:id", remove);
contractRouter.patch("/:id", update);
contractRouter.post("/create", create);

module.exports = contractRouter;
