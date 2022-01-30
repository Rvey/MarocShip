const ManagerController = require('../controllers/manager.controller')
const DeliveryManager = require('../controllers/deliveryManager.controller')
const AdminController = require('../controllers/admin.controller')
const DriverController = require('../controllers/driver.controller')
const DeliveryController = require('../controllers/delivery.controller')
const { verifyToken } = require('../helpers/JwtValidation');
const { adminAuth, managerAuth, deliveryManager, driverAuth, AdminAuth } = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')

module.exports = (app) => {

    /**
     * General Admin Routes
     */
    app.post('/api/admin/login', AdminController.loginAdmin);

    /**
     * Manager Routes
     */
    app.post('/api/manager/resetPassword', ManagerController.resetPassword)
    app.get('/api/manager/',AdminAuth ,ManagerController.index);
    app.get('/api/manager/:id', ManagerController.show);
    app.post('/api/manager/', ManagerController.store);
    app.post('/api/manager/login', ManagerController.loginManager);
    app.delete('/api/manager/:id', ManagerController.destroy);
    app.put('/api/manager/:id', ManagerController.update)

    /**
     * Delivery Manager Routes
     */
    app.get('/api/deliveryManager/', DeliveryManager.index);
    app.get('/api/deliveryManager/:id', DeliveryManager.show);
    app.post('/api/deliveryManager/', DeliveryManager.store);
    app.post('/api/deliveryManager/login', DeliveryManager.loginDeliveryManager);
    app.delete('/api/deliveryManager/:id', DeliveryManager.destroy);
    app.put('/api/deliveryManager/:id', DeliveryManager.update)
    app.post('/api/deliveryManager/resetPassword', DeliveryManager.resetPassword)

    /**
     * Driver Routes
    */
    app.get('/api/driver/', DriverController.index);
    app.get('/api/driver/:id', DriverController.show);
    app.post('/api/driver/', upload, DriverController.store);
    app.post('/api/driver/login', DriverController.loginDriver);
    app.delete('/api/driver/:id', DriverController.destroy);
    app.put('/api/driver/validateDriver/:id', DriverController.validateDriver);
    app.put('/api/driver/driverBonus/:id', DriverController.driverBonus);
    app.put('/api/driver/:id', DriverController.update)
    app.post('/api/driver/resetPassword', DriverController.resetPassword)

    /**
     * Delivery Routes
        */
    app.get('/api/delivery/', DeliveryController.index);
    app.get('/api/delivery/:id', DeliveryController.show);
    app.post('/api/delivery/', DeliveryController.store);
    app.put('/api/delivery/acceptDelivery/:id', DeliveryController.AcceptDelivery);
    app.delete('/api/delivery/:id', DeliveryController.destroy);
    app.put('/api/delivery/:id', DeliveryController.update)

}
