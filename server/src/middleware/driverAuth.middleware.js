const jwt = require('jsonwebtoken');

const driverAuth = (req, res, next ) => {
    const token = req.cookies.jwt;
    const role = req.cookies.role;
    if (token && role == 'driver') {
      jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decodedToken) => {
        if (err) {
         res.json({ error: err.message });
        } else {
            next();
        }
    });
    } else {
        res.json({ message: "You need to be driver to access" });
    }
  };


module.exports = driverAuth;