const express = require('express')

// controller functions
const { loginUser, signupUser, getUsers, deleteUser, updateUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// get all users
router.get('/users', getUsers)

//delete a user
router.delete('/:id', deleteUser)

//update a user
router.patch('/:id', updateUser)

module.exports = router