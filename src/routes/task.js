const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const taskController = require('../controller/task')


router.get('/', authMiddleware, taskController.getAllTask)
router.post('/create', authMiddleware, taskController.createTask)
router.put('/', authMiddleware, taskController.updateStatus)
router.delete('/', authMiddleware, taskController.deleteTask)

module.exports = router
