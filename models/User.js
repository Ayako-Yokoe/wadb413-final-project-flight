const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const bcryptSalt = 10


const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        cart: {
            items: [{
                ticketId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Ticket'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }]
        }
    },
    {
        timestamps: true
    }
)


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    const hash = await bcrypt.hash(this.password, bcryptSalt)
    this.password = hash
    next()
})


userSchema.methods.addToCart = function(ticket) {
    const cartTicketIndex = this.cart.items.findIndex(item => item.ticketId.toString() === ticket._id.toString())

    let newQuantity = 1

    const updatedCartItems = [...this.cart.items]

    if(cartTicketIndex >= 0){
        newQuantity = this.cart.items[cartTicketIndex].quantity + 1
        updatedCartItems[cartTicketIndex].quantity = newQuantity
    } else {
        updatedCartItems.push({
            ticketId: ticket._id,
            quantity: newQuantity
        })
    }

    const updatedCart = { items: updatedCartItems }

    this.cart = updatedCart
    return this.save()
}

module.exports = mongoose.model('User', userSchema)