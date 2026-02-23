const {onCall} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jaredvaneeden2006@gmail.com",
    pass: "sbpt jmmu jfct ubxn", // Your verified app password
  },
});

exports.sendContactEmail = onCall({maxInstances: 10}, async (request) => {
  const {name, email, message, time} = request.data;

  const mailOptions = {
    from: "Portfolio Contact Form",
    to: "jaredvaneeden2006@gmail.com",
    subject: `New Message from ${name}`,
    text: `Time: ${time}\nFrom: ${name} (${email})\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully.");
    return {status: "success"};
  } catch (error) {
    logger.error("Email error:", error);
    return {status: "error", message: error.toString()};
  }
});
