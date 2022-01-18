const nodemailer = require("nodemailer");

const sendMail = async (email) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD,
      },
    });
    let mailDetails = {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: 'Nice Nodemailer test',
      text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs" , err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = 
  sendMail;