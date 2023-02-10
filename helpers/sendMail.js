const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const mailToUser = (email, coach, content) => {
  const config = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: `Your coaching session with ${coach}`,
    text: content,
  };

  transport.sendMail(config, (err, info) => {
    if (!err) {
      console.log(`Email sent to user ${info.response}`);
    } else {
      console.log(err);
    }
  });
};

const mailToAdmin = (email, user, coach, content) => {
  const config = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: `Preparation for coaching session ${user} with ${coach}`,
    text: content,
  };

  transport.sendMail(config, (err, info) => {
    if (!err) {
      console.log(`Email sent to user ${info.response}`);
    } else {
      console.log(err);
    }
  });
}

module.exports = { mailToUser, mailToAdmin };
