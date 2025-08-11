const express = require("express");

const router = express.Router();

const { EmailController } = require("../../controllers");

// POST /api/v1/email/notification
router.post(
  "/notification",
  EmailController.createEmailNoti,
);


module.exports = router;