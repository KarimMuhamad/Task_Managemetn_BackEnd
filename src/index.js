const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: "Sukses",
  })
})

app.listen(PORT, () => {
  console.log(`Server runing in PORT: ${PORT}`)
})