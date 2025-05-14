const {
  create,
  loginAuthor,
  getAll,
  getById,
  update,
  remove,
  logoutAuthor,
} = require("../controllers/author.controller");
const authorJwtGuard = require("../middleware/guards/author-jwt.guard");
const authorSelfGuard = require("../middleware/guards/author-self.guard");

const router = require("express").Router();

router.post("/create", create);
router.post("/login", loginAuthor);
router.get("/", getAll);
router.get("/logout", logoutAuthor);
router.get("/:id", authorJwtGuard, authorSelfGuard, getById);
router.patch("/:id", authorJwtGuard, authorSelfGuard, update);
router.delete("/:id", authorJwtGuard, authorSelfGuard, remove);

module.exports = router;
