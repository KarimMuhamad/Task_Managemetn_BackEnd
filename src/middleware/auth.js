const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) return res.status(401).json({msg: 'Unauthorized'})

    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({msg: 'Invalid Token'})

        req.user = user
        next()
    })
}

module.exports = authMiddleware