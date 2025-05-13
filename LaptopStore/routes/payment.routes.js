const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
  getTimeoutProducts,
  getSelledProducts,
} = require("../controllers/payment.controller");

let paymentRouter = Router();

paymentRouter.get("/", getAll);
paymentRouter.get("/timeout", getTimeoutProducts);
paymentRouter.post("/selled", getSelledProducts);
paymentRouter.get("/:id", getById);
paymentRouter.delete("/:id", remove);
paymentRouter.patch("/:id", update);
paymentRouter.post("/create", create);

module.exports = paymentRouter;
