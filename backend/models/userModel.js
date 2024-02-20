const mongoose = require('mongoose')

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

const User = mongoose.model('User', userSchema)

module.exports = User