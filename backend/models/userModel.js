const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, 'Username missing'],
        unique: true
      },
      email: {
        type: String,
        required: [true, 'Email missing'],
        match: /.+@.+\..+/,
        unique: true
      },
      plan: {
        type: String,
        required: [true, 'Plan missing']
      }
    },
    { timestamps: true }
)

userSchema.methods.createResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
  
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpires = Date.now() + 600000
  
    // console.log(resetToken, this.passwordResetToken)
  
    return resetToken
  }
  
userSchema.plugin(passportLocalMongoose)  

const User = mongoose.model('User', userSchema)

module.exports = User