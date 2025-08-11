const { StatusCodes } = require("http-status-codes");

const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { EmailService } = require("../services");

async function createEmailNoti(req, res) {
  try {
    const email = await EmailService.createEmailNoti({
      recipientEmail: req.body?.recipientEmail,
      subject: req.body?.subject,
      content: req.body?.content,
    });
    SuccessResponse.message = "Successfully created an email notification";
    SuccessResponse.data = email;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createEmailNoti,
};
