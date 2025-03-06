const prisma = require('../config/db')
const argon2 = require('argon2')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

// Registrasi User
const registUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }


    const hashedPassword = await argon2.hash(password);
    console.log(hashedPassword)

    const newUser = await prisma.user.create({
      data : {
        username,
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({ message: "Registrasi berhasil", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }

}

// Login Users
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body

    const user = await prisma.user.findUnique({where: {email}})
    if(!user) return res.status(404).json({message: "email tidak terdaftar"})
    
    const validPassword = await argon2.verify(user.password, password)
    if(!validPassword) return res.status(404).json({message: "Password salah"})

    const payload = {id: user.id,username: user.username, email: user.email}

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.json({msg: "Login Succes", payload, token})

  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

module.exports = {registUser, loginUser}