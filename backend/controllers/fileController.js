const File = require('../models/fileModel')
const mongoose = require('mongoose')

// get all workouts
const getFiles = async (req, res) => {
  const files = await File.find({}).sort({createdAt: -1})

  res.status(200).json(files)
}

// get a single workout
const getFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such data'})
  }

  const file = await File.findById(id)

  if (!file) {
    return res.status(404).json({error: 'No such data'})
  }
  
  res.status(200).json(file)
}

// create new workout
const createFile = async (req, res, next) => {
  const {base64File} = req.body

  let emptyFields = []
  if(!base64File) {
    emptyFields.push('file')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: emptyFields})
  }

  // add doc to db 
  try {
    const file = await File.create({file: base64File})
    res.status(200).json(file)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const file = await File.findOneAndDelete({_id: id})

  if (!file) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(file)
}

// update a workout
const updateFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const file = await File.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!file) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(file)
}


module.exports = {
  getFiles,
  getFile,
  createFile,
  deleteFile,
  updateFile
}
