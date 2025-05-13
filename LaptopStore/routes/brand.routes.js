const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/brand.controller");

let brandRouter = Router();

brandRouter.get("/", getAll);
brandRouter.get("/:id", getById);
brandRouter.delete("/:id", remove);
brandRouter.patch("/:id", update);
brandRouter.post("/create", create);

module.exports = brandRouter;
