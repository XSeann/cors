const express = require('express')

const {
    getFiles, getFile, createFile, deleteFile, updateFile
} = require('../controllers/fileController')

const router = express.Router()

router.get('/', getFiles)
router.get('/:id', getFile)
router.post('/upload', createFile)
router.delete('/:id', deleteFile)
router.patch('/:id', updateFile)

module.exports = router