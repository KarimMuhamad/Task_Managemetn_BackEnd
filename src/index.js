const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT

const usersRoutes = require('./routes/users')

const app = express()

app.use('/users', usersRoutes)

app.get('/', (req, res) => {
  res.json({
    message: "Sukses",
  })
})

app.listen(PORT, () => {
  console.log(`Server runing in PORT: ${PORT}`)
})