const File = require('../models/fileModel')
const fileparser = require('../utils/fileparser')

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
  .then(data => {
    res.status(200).json({
      message: "Success",
      data
    })
  })
  .catch(error => {
    res.status(400).json({
      message: "An error occurred.",
      error
    })
  })
}

module.exports = {
    getAllFiles,
    getById,
    uploadFile
}