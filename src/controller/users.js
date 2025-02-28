const getAllUsers = (req, res) => {
  res.json({
    message: 'Get all users succes',
  })
}

const createNewUser = (req, res) => {
  res.json({
    message: 'Create new success'
  })
}

module.exports = {
  getAllUsers,
  createNewUser
}