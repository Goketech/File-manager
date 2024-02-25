const mongoose = require('mongoose')

const fileSchema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: [true, 'UserId missing'],
      },
      status: {
        type: String
    },
    url: {
        type: String,
        required: [true, 'File url missing']
    },
    key: {
        type: String,
        required: [true, 'File key missing']
    }

    },
    { timestamps: true }
)


const File = mongoose.model('File', fileSchema)

module.exports = File