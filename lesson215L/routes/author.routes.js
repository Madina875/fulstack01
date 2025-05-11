const {
  // create,
  // getAll,
  // getById,
  // update,
  // remove,
  // loginAuthor,
  // register,
  create,
  // loginAuthor,
  loginAuthor,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/author.controller");
const authorJwtGuard = require("../middleware/guards/author-jwt.guard");
const authorSelfGuard = require("../middleware/guards/author-self.guard");

const router = require("express").Router();

router.post("/create", create);
router.post("/login", loginAuthor);
// router.post("/regis", register);
router.get("/", authorJwtGuard, authorSelfGuard, getAll);
router.get("/:id", authorJwtGuard, authorSelfGuard, getById);
router.patch("/:id", authorJwtGuard, authorSelfGuard, update);
router.delete("/:id", authorJwtGuard, authorSelfGuard, remove);

module.exports = router;
