const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const usersRoutes = require('./routes/users')
const dashboardRoutes = require('./routes/task')
const logReq = require('./middleware/logs')

const app = express()
app.use(express.json())
app.use(logReq)

app.use('/users', usersRoutes)
app.use('/task', dashboardRoutes)

app.listen(PORT, () => {
  console.log(`Server runing in PORT: ${PORT}`)
})