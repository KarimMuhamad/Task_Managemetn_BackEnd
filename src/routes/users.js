const express = require('express')
const router = express.Router()

const userController = require('../controller/users')

router.get('/', userController.getAllUsers)

router.post('/', userController.createNewUser)

router.delete('/', userController.deleteUser)

module.exports = router