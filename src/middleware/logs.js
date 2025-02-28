const mdlLogReq = (req, res, next) => {
  console.log(`Terjadi Reques ke PATH: ${req.path}`)
  next()
}

module.exports = mdlLogReq