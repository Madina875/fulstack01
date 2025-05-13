const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/customer.controller");

let customerRouter = Router();

customerRouter.get("/", getAll);
customerRouter.get("/:id", getById);
customerRouter.delete("/:id", remove);
customerRouter.patch("/:id", update);
customerRouter.post("/create", create);

module.exports = customerRouter;
