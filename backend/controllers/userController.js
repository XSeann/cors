const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  
  try {
    const user = await User.login(email, password)

    const exists = await User.findOne({ email })
    let is_admin = exists.is_admin

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, is_admin} )
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, base1, base2, is_admin, approved} = req.body

  try {
    const user = await User.signup(email, password, base1, base2, is_admin, approved)
    
    res.status(200).json({email, password, base1, base2, is_admin, approved})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//Get all user
const getUsers = async (req, res) => {
  const users = await User.find({})

  res.status(200).json(users)
}

// delete a workout
const deleteUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const file = await User.findOneAndDelete({_id: id})
  
    if (!file) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(file)
  }
  
  // update a workout
  const updateUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const file = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!file) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(file)
  }

module.exports = { signupUser, loginUser, getUsers, deleteUser, updateUser }