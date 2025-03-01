const getAllUsers = (req, res) => {
  res.json({
    message: 'Get all users succes',
  })
}

const createNewUser = (req, res) => {
  const data = req.body
  res.json({
    message: 'Create new success',
    data : data,
  })
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