const {body} = require('express-validator')

const validateRegister = [
    body('username').notEmpty().withMessage('Username tidak boleh kosong'),
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password').isLength({min: 6}).withMessage('Minimal 6 karakter')
]

const validateLogin = [
    body('email').isEmail().withMessage('Email Tidak Valid'),
    body('password').notEmpty().withMessage('Password Kosong')
]

module.exports = {validateRegister, validateLogin}