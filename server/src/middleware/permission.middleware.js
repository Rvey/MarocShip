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
const deliveryManager = (req, res, next ) => {
    const token = req.cookies.jwt;
    const role = req.cookies.role;
    if (token && role == 'deliveryManger') {
      jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decodedToken) => {
        if (err) {
         res.json({ error: err.message });
        } else {
            next();
        }
    });
    } else {
        res.json({ message: "You need to be deliveryManager to access" });
    }
  };
  const managerAuth = (req, res, next ) => {
    const token = req.cookies.jwt;
    // const role = req.cookies.role;
    if (token) {
      jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decodedToken) => {
        if (err) {
         res.json({ error: err.message });
        } else {
            next();
        }
    });
    } else {
        res.json({ message: "You need to be manager to access" });
    }
  };
  
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
module.exports = {
  adminAuth,
  deliveryManager,
  managerAuth,
  driverAuth
};