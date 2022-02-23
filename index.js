const express = require('express')
const cors = require('cors')
const path = require("path");

require('dotenv').config()
require('express-async-errors')
require('./util/db')

const app = express()

// Francois's help
app.use(express.static(path.resolve(__dirname, "./client/build"))); 
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
}); 


app.use(cors())
app.use(express.json())

app.use('/api/v1', require('./routes/index'))


app.use((error, req,res,next) => {
    res.status(500).json({ error: error.message })
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening to port : ', PORT))

module.exports = app