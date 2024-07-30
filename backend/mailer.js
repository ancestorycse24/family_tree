// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service
  auth: {
    user: 'ancestorycse24@gmail.com', // Your email address
    pass: 'tyje dlla tuyy wdyb'   // Your email password or app-specific password
  }
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'ancestorycse24@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendMail;
