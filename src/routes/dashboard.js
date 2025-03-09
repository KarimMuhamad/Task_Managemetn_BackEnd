const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')


router.get('/', authMiddleware, (req, res) => {
    res.status(200).json({msg: 'succes', user: req.user})
})

module.exports = router