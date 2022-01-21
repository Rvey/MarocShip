const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const managerEmail = async (email, firstName , lastName,password) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
    
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: './src/views/',
        defaultLayout: false,
      },
      viewPath: './src/views/',
      extName: '.handlebars',
    }
    mailTransporter.use('compile', hbs(handlebarOptions))
    let mailDetails = {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: 'marocShip hiring',
      template: 'manager',
      context: {
        firstName: firstName,
        lastName: lastName,
        email:email,
        password : password
      },
    }

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs', err)
      } else {
        console.log('Email sent successfully', data)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = managerEmail