const {
  create,
  loginUser,
  getAll,
  getById,
  update,
  remove,
  logoutUser,
  // refreshUserToken,
  // authorActivate,
} = require("../controllers/user.controller");
const userJwtGuard = require("../middleware/guards/user-jwt.guard");
const userSelfGuard = require("../middleware/guards/user-self.guard");

const router = require("express").Router();

router.post("/create", create);
router.post("/login", loginUser);
router.post("/sds/logout", logoutUser);

// router.post("/refresh", refreshUserToken);
// router.get("/activate/:link", authorActivate);

router.get("/", getAll);
router.get("/:id", userJwtGuard, userSelfGuard, getById); // agar boshqa id dan kirilsa malumotlarni korsatmaydi
router.patch("/:id", userJwtGuard, userSelfGuard, update);
router.delete("/:id", userJwtGuard, userSelfGuard, remove);

module.exports = router;
