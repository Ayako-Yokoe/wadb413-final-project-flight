const router = require("express").Router()

const {
  signInController,
  signUpController,
  resetPasswordRequestController,
  resetPasswordController,
  postCartController,
  logoutController
} = require('../controllers/auth')


router.post('/auth/signin', signInController)
router.post('/auth/signup', signUpController)
router.post('/auth/requestresetpassword', resetPasswordRequestController)
router.post('/auth/resetpassword', resetPasswordController)
router.post('/auth/cart', postCartController)
router.post('/auth/logout', logoutController)

module.exports = router