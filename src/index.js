const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const usersRoutes = require('./routes/users')
const logReq = require('./middleware/logs')
const connDB = require('./config/db')

const app = express()

app.use(express.json())
app.use(logReq)

async function startServer() {
  try {
    const db = await connDB()

    app.use((req, res, next) => {
      req.db = db
      next()
    })

    app.use('/users', usersRoutes)

    app.get("/test-db", async (req, res) => {
      try {
        const collections = await req.db.listCollections().toArray();
        res.json({ message: "Database connected", collections });
      } catch (err) {
        res.status(500).json({ error: "Database connection failed" });
        console.log(err)
      }
    });

    app.listen(PORT, () => {
      console.log(`Server runing in PORT: ${PORT}`)
    })
  } catch (err) {
    console.log('failed to start server', err)
  }
}

startServer()