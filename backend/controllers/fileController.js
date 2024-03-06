const File = require('../models/fileModel')
const fileparser = require('../utils/fileparser')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
  version: process.env.S3_VERSION,
})
const s3 = new AWS.S3()

// Function for getting all files
const getAllFiles = async (req, res) => {
  try {
    const files = await File.find({})
    res.status(200).json(files)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Function for getting file by ID
const getById = async (req, res) => {
  try {
    const { id } = req.params
    const file = await File.findById(id)
    res.status(200).json(file)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Function for uploading file
const uploadFile = async (req, res) => {
  await fileparser(req)
    .then((data) => {
      res.status(200).json({
        message: 'Success',
        data,
      })
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error occurred.',
        error,
      })
    })
}

// Function for deleting a file
const deleteFile = async (req, res) => {
  const { fileName } = req.body
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName
  }
  try {
    await s3.headObject(params).promise()
    console.log('File Found in S3')
    try {
      await s3.deleteObject(params).promise()
      console.log('file deleted Successfully')
    } catch (err) {
      console.log('ERROR in file Deleting : ' + JSON.stringify(err))
    }
  } catch (err) {
    console.log('File not Found ERROR : ' + err.code)
  }
}

module.exports = {
  getAllFiles,
  getById,
  uploadFile,
  deleteFile,
}
