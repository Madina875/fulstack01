const { Router } = require("express");

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/lphoto.controller");

let laptopPhotoRouter = Router();

laptopPhotoRouter.get("/", getAll);
laptopPhotoRouter.get("/:id", getById);
laptopPhotoRouter.delete("/:id", remove);
laptopPhotoRouter.patch("/:id", update);
laptopPhotoRouter.post("/create", create);

module.exports = laptopPhotoRouter;
