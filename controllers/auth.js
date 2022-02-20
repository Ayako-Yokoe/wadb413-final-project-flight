const {
    signin,
    signup,
    requestResetPassword,
    resetPassword
} = require('../middleware/auth.service')

const User = require('../models/User')
const Ticket = require('../models/Ticket')


const signInController = async (req,res,next) => {
    const signInService = await signin(req.body.email, req.body.password)
    return res.json(signInService)
}

const signUpController = async (req,res,next) => {
    const signUpService = await signup(req.body)
    return res.json(signUpService)
}

const resetPasswordRequestController = async (req,res,next) => {
    const requestPasswordResetService = await requestResetPassword(req.body.email)
    return res.json(requestPasswordResetService)
}

const resetPasswordController = async (req,res,next) => {
    const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password
        )
    return res.json(resetPasswordService)
}

const postCartController = async (req,res,next) => {
    const { ticketId, user } = req.body
    const ticket = await Ticket.findById(ticketId)
    await req.user.addToCart(ticket)

    res.redirect('/cart')
}

const logoutController = (req,res,next) => {
    res.send({ msg: 'The user has logged out.'})
}


module.exports = {
    signInController,
    signUpController,
    resetPasswordRequestController,
    resetPasswordController,
    postCartController,
    logoutController
}