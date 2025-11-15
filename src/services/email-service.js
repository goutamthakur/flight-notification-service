const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");

const { EmailNotiRepository } = require("../repositories");
const Mailer = require("../config/email-config");
const ServerConfig = require("../config/server-config");

const emailNotiRepository = new EmailNotiRepository();

async function sendMail(mailFrom, mailTo, subject, html) {
  try {
    const response = await Mailer.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      html: html,
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

async function sendBookingConfirmationMail(data) {
  try {
    // Get user data from user service
    // Using Temp email to test mail
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE_URL}/api/v1/flights/${data?.flightId}`
    );
    const flightDetails = flight?.data?.data;

    const templatePath = path.join(
      __dirname,
      "../templates/bookingConfirmation.html"
    );
    let bookingTemplate = await fs.promises.readFile(templatePath, "utf-8");

    bookingTemplate = bookingTemplate
      .replace("{{flightNumber}}", flightDetails?.flightNumber)
      .replace("{{departureAirport}}", flightDetails?.departureAirportId)
      .replace("{{arrivalAirport}}", flightDetails?.arrivalAirportId)
      .replace("{{seatsBooked}}", data?.noOfSeats)
      .replace("{{totalCost}}", data?.paidAmount);

    await sendMail(
      ServerConfig.GMAIL_EMAIL,
      ServerConfig.TEMP_EMAIL,
      `Booking Confirmation – Flight ${flightDetails?.flightNumber}`,
      bookingTemplate
    );
    return true;
  } catch (error) {
    console.log("Error sending booking confirmation mail", error);
    return false;
  }
}

async function sendRegisterOtpMail(data) {
  try {
    const templatePath = path.join(__dirname, "../templates/registerOtp.html");

    let registerTemplate = await fs.promises.readFile(templatePath, "utf-8");

    registerTemplate = registerTemplate.replace("{{otp}}", data?.otp);

    await sendMail(
      ServerConfig.GMAIL_EMAIL,
      ServerConfig.TEMP_EMAIL,
      `OTP verification`,
      registerTemplate
    );
    return true;
  } catch (error) {
    console.log("Error sending booking confirmation mail", error);
    return false;
  }
}

module.exports = {
  sendMail,
  createEmailNoti,
  getPendingEmails,
  sendBookingConfirmationMail,
  sendRegisterOtpMail,
};
