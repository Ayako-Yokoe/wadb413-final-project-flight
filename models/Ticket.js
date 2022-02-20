const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ticketSchema = new Schema({
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)