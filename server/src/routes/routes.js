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
    app.get('/api/manager/:id',AdminAuth, ManagerController.show);
    app.post('/api/manager/',AdminAuth, ManagerController.store);
    app.post('/api/manager/login', ManagerController.loginManager);
    app.delete('/api/manager/:id',AdminAuth, ManagerController.destroy);
    app.put('/api/manager/:id',AdminAuth, ManagerController.update)

    /**
     * Delivery Manager Routes
     */
    app.get('/api/deliveryManager/', DeliveryManager.index);
    app.get('/api/deliveryManager/:id',managerAuth, DeliveryManager.show);
    app.post('/api/deliveryManager/',managerAuth, DeliveryManager.store);
    app.post('/api/deliveryManager/login', DeliveryManager.loginDeliveryManager);
    app.delete('/api/deliveryManager/:id',managerAuth, DeliveryManager.destroy);
    app.put('/api/deliveryManager/:id',managerAuth, DeliveryManager.update)
    app.post('/api/deliveryManager/resetPassword', DeliveryManager.resetPassword)

    /**
     * Driver Routes
    */
    app.get('/api/driver/', DriverController.index);
    app.get('/api/driver/:id',AdminAuth, DriverController.show);
    app.post('/api/driver/', upload, DriverController.store);
    app.post('/api/driver/login', DriverController.loginDriver);
    app.delete('/api/driver/:id',AdminAuth, DriverController.destroy);
    app.put('/api/driver/validateDriver/:id',AdminAuth, DriverController.validateDriver);
    app.put('/api/driver/driverBonus/:id', DriverController.driverBonus);
    app.put('/api/driver/:id',AdminAuth, DriverController.update)
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
