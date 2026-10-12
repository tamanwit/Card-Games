const express = require('express')
const router = express.Router()

const { verifyUser } = require('../middleware/authMiddleware')
const {registerUser, loginUser, getProfile, logOutUser} = require('../controllers/authController')

router.get('/profile', verifyUser, getProfile)
router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/logout', logOutUser)

module.exports = router