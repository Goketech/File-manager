const express = require('express')
const cors = require('cors')
const connectDB = require('./database/db')
const User = require('./models/userModel')
const app = express()

require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.json())

connectDB()

app.use(require('./routes'))

// Homepage
app.get('/', async function (req, res) {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Node.js app running on port ${process.env.PORT}`)
})