const stageRouter = require("./stage.routes");
const statusRouter = require("./status.routes");
const branchRouter = require("./branch.routes");
const roleRouter = require("./role.routes");
const reasonRouter = require("./reason.routes");

const router = require("express").Router();

router.use("/stage", stageRouter);
router.use("/branch", branchRouter);
router.use("/role", roleRouter);
router.use("/reason", reasonRouter);
router.use("/status", statusRouter);

module.exports = router;
