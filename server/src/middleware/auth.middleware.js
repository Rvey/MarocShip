const { verifyToken } = require('../helpers/JwtValidation');

const AdminAuth = (req, res, next) => {
  verifyToken(req, res, next, 'admin');
}
const deliveryManager = (req, res, next) => {
  verifyToken(req, res, next, 'deliveryManger');
};
const managerAuth = (req, res, next) => {
  verifyToken(req, res, next, 'manager');
};

const driverAuth = (req, res, next) => {
  verifyToken(req, res, next, 'driver');
};
module.exports = {
  AdminAuth,
  deliveryManager,
  managerAuth,
  driverAuth
};