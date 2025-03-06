const express = require('express')
const router = express.Router()

const {validateRegister, validateLogin} = require('../middleware/validator')
const userController = require('../controller/users')

router.get('/login', validateLogin, userController.loginUser)
router.post('/register', validateRegister, userController.registUser)
router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Jika token disimpan dalam cookie
    res.json({ message: 'Logout berhasil' });
});

module.exports = router