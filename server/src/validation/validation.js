const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const comparePassword = async (password, user, res) => {
    bcrypt.compare(password, user.password)
        .then((isCorrect) => {
            if (isCorrect) {
                const payload = {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
                jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' }, (err, token) => {
                    if (err) return res.json({ message: err.message })
                    res.cookie('jwt', token, { httpOnly: true })
                    res.cookie('role', user.role, { httpOnly: true })
                    res.cookie('id', user._id, { httpOnly: true })
                    return res.json({
                        token: token,
                        role: user.role,
                        email: user.email,

                    })
                    
                })
            } else {
                res.json({ message: "Invalid Username or password" })
            }
        })
}

module.exports = { comparePassword }


