const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const usersRoutes = require('./routes/users')
const logReq = require('./middleware/logs')

const app = express()
app.use(express.json())
app.use(logReq)

app.use('/users', usersRoutes)

app.listen(PORT, () => {
  console.log(`Server runing in PORT: ${PORT}`)
})