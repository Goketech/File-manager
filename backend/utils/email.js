const nodemailer = require('nodemailer')

const sendEmail = async (option) => {
  // transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const emailOptions = {
    from: 'Cloud Support<modupe@modupeakanni.tech>',
    to: option.email,
    subject: option.subject,
    text: option.message
  }

  transporter.sendMail(emailOptions)
}

module.exports = sendEmail
