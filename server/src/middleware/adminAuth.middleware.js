const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next ) => {
    const token = req.cookies.jwt;
    const role = req.cookies.role;
    if (token && role == 'admin') {
      jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decodedToken) => {
        if (err) {
         res.json({ error: err.message });
        } else {
            next();
        }
    });
    } else {
        res.json({ message: "You need to be admin to access" });
    }
  };

module.exports = adminAuth;