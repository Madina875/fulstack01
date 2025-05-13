const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/laptops.controller");

let laptopRouter = Router();

laptopRouter.get("/", getAll);
laptopRouter.get("/:id", getById);
laptopRouter.delete("/:id", remove);
laptopRouter.patch("/:id", update);
laptopRouter.post("/create", create);

module.exports = laptopRouter;
