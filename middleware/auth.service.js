const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const sendEmail = require('../util/email/sendEmail')
const User = require('../models/User')
const Token = require('../models/Token')
const Ticket = require('../models/Ticket')

const JWTSecret = process.env.JWT_SECRET
const clientURL = process.env.CLIENT_URL
const bcryptSalt = 10


const signin = async (email, password) => {
    let user = await User.findOne({ email: email})

    if(!user){
        throw new Error('User does not exit. Please try again')
    }

    const isValid = await bcrypt.compare(password, user.password)
    const token = JWT.sign({ id: user._id}, JWTSecret)

    if(isValid){
        return ( data = {
            userId: user._id,
            email: user.email,
            name: user.name,
            token
        })
    }
}

const signup =  async (data) => {
    let user = await User.findOne({ email: data.email })

    if(user){
        throw new Error('Email already exists.', 422)
    }

    user = new User(data)
    const token = JWT.sign({ id: user._id }, JWTSecret)
    await user.save()

    return ( data = {
        userId: user._id,
        email: user.email,
        name: user.name,
        token
    } )
}

const requestResetPassword = async (email) => {
    const user = await User.findOne({ email })
    if(!user) throw new Error('Email does not exit')

    const token = await Token.findOne({ userId: user._id})
    if(token) await token.deleteOne()

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hash = await bcrypt.hash(resetToken, bcryptSalt)

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now()
    }).save()

    const link = `${clientURL}/passwordreset?token=${resetToken}&id=${user._id}`

    sendEmail(
        user.email,
        'Password Reset Request',
        { name: user.name, link },
        './template/requestResetPassword.handlebars'
    )

    return link
}

const resetPassword = async (userId, token, newPassword) => {
    const passwordResetToken = await Token.findOne({ userId })

    if(!passwordResetToken){
        throw new Error('Invalid entry or the password reset token has expired')
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token)

    if(!isValid){
        throw new Error('Invalid entry or the password reset token has expired') 
    }

    const hash = await bcrypt.hash(newPassword, bcryptSalt)

    await User.updateOne({ _id: userId}, { $set: { password: hash }}, { new: true })

    const user = await User.findById({ _id: userId })

    sendEmail(
        user.email,
        'Password Reset Successfully',
        { name: user.name },
        './template/resetPassword.handlebars'
    )

    await passwordResetToken.deleteOne()

    return true
}


module.exports = {
    signin,
    signup,
    requestResetPassword,
    resetPassword
}