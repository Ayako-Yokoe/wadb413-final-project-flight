const mongoose = require('mongoose')
const connect = mongoose.connect(process.env.MONGO_DB_CONNECTION)
connect.then(() => console.log('connected to db')).catch((err) => console.log(err))