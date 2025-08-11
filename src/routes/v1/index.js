const express = require("express");

const router = express.Router();

const { InfoController } = require("../../controllers");
const emailRoutes = require("./email-routes");

router.get("/info", InfoController.info);

router.use("/email", emailRoutes);

module.exports = router;
