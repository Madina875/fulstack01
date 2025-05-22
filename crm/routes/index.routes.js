const stageRouter = require("./stage.routes");

const router = require("express").Router();

router.use("/stage", stageRouter);

module.exports = router;
