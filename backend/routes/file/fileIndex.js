const express = require('express')
const router = express.Router()
const fileController = require('../../controllers/fileController')

router.route('/').get(fileController.getAllFiles)
router.route('/:id').get(fileController.getById)
router.route('/upload').post(fileController.uploadFile)

module.exports = router