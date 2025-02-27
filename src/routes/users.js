const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Get user succes',
  })
})

router.post('/', (req, res) => {
  res.send('Post Method')
})

module.exports = router