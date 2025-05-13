const router = require("express").Router();
const modelRouter = require("./model.routes");
const paymentRouter = require("./payment.routes");
const adressRouter = require("./adress.routes");
const customerRouter = require("./customer.routes");
const contractRouter = require("./contracts.routes");
const categoryRouter = require("./category.routes");
const brandRouter = require("./brand.routes");
const laptopRouter = require("./laptop.routes");
const laptopPhotoRouter = require("./lapphoto.routes");
const feautureRouter = require("./fautures.routes");
const feautureCompRouter = require("./fautureComp.routes");

router.use("/model", modelRouter);
router.use("/adress", adressRouter);
router.use("/custom", customerRouter);
router.use("/contract", contractRouter);
router.use("/category", categoryRouter);
router.use("/payment", paymentRouter);
router.use("/brand", brandRouter);
router.use("/laptop", laptopRouter);
router.use("/lapphoto", laptopPhotoRouter);
router.use("/feauture", feautureRouter);
router.use("/feautureC", feautureCompRouter);

module.exports = router;
