const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const { EmailNotiRepository } = require("../repositories");
const { Mailer } = require("../config");

const emailNotiRepository = new EmailNotiRepository();

async function sendMail(mailFrom, mailTo, subject, text) {
  try {
    const response = await Mailer.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });

    return response;
  } catch (error) {
    throw new AppError(
      "Something went wrong while sending an email",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createEmailNoti(data) {
  try {
    const response = await emailNotiRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Something went wrong while creating an email notification",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getPendingEmails() {
  try {
    const response = await emailNotiRepository.getPendingEmails();
    return response;
  } catch (error) {
    throw new AppError(
      "Something went wrong while getting pending emails",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  sendMail,
  createEmailNoti,
  getPendingEmails,
};
