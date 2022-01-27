const jwt = require('jsonwebtoken')
const verifyJwt = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (token) {
        jwt.verify(token, `${process.env.JWT_SECRET_KEY}` , (err , decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.user = {}
            req.user.id = decoded.id
            req.user.role = decoded.role
            req.user.email = decoded.email,
            next()
        })
    }else {
        res.json({ message: "Incorrect Token Given " , isLoggedIn: false  })
    }
}
module.exports = verifyJwt