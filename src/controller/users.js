const {getDB} = require('../config/db')

const getAllUsers = async (req, res) => {
  try {
    const db = getDB()
    const data = await db.collection('users').find().toArray()
  
    res.json({
      message: 'Get all users succes',
      data: data,
    })
  } catch (err) {
    res.json({
      error: 'Database eror'
    })
  }
}

const createNewUser = (req, res) => {
  try {
    const db = getDB()
    const {username, email, password} = req.body
  
    const data = db.collection('users').insertOne({username, email, password})
  
    res.json({
      message: 'Register Succes',
      data : data,
    })
  } catch (err) {
    res.json({
      error: 'Database eror'
    })
  }

}

const deleteUser = (req, res) => {
  const id = req.query.id
  res.json({
    message: "succes delete user",
    id: id,
  })
}

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
}