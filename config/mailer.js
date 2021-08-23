const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'spimapp21@gmail.com', // generated ethereal user
      pass: 'xovn jmtb mwkz suta ', // generated ethereal password
    },
  });