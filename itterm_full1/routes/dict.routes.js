const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/dict.controller");
const authorExportGuard = require("../middleware/guards/author-export.guard");
const authorJwtGuard = require("../middleware/guards/author-jwt.guard");

const router = require("express").Router();

router.post("/create", authorJwtGuard, authorExportGuard, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
