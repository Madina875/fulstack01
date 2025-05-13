const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/adress.controller");

let adressRouter = Router();

adressRouter.get("/", getAll);
adressRouter.get("/:id", getById);
adressRouter.delete("/:id", remove);
adressRouter.patch("/:id", update);
adressRouter.post("/create", create);

module.exports = adressRouter;
