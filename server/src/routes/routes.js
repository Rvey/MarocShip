const ManagerController = require('../controllers/manager.controller')
const DeliveryManager = require('../controllers/deliveryManager.controller')
const AdminController = require('../controllers/admin.controller')
const DriverController = require('../controllers/driver.controller')
const DeliveryController = require('../controllers/delivery.controller')

const { adminAuth, managerAuth, deliveryManager, driverAuth } = require('../middleware/permission.middleware')
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
    app.get('/api/manager/', ManagerController.index);
    app.get('/api/manager/:id', ManagerController.show);
    app.post('/api/manager/', adminAuth, ManagerController.store);
    app.post('/api/manager/login', ManagerController.loginManager);
    app.delete('/api/manager/:id', ManagerController.destroy);
    app.put('/api/manager/:id', ManagerController.update)

    /**
     * Delivery Manager Routes
     */
    app.get('/api/deliveryManager/', managerAuth, DeliveryManager.index);
    app.get('/api/deliveryManager/:id', managerAuth, DeliveryManager.show);
    app.post('/api/deliveryManager/', managerAuth, DeliveryManager.store);
    app.post('/api/deliveryManager/login', DeliveryManager.loginDeliveryManager);
    app.delete('/api/deliveryManager/:id', managerAuth, DeliveryManager.destroy);
    app.put('/api/deliveryManager/:id', managerAuth, DeliveryManager.update)
    app.post('/api/deliveryManager/resetPassword', DeliveryManager.resetPassword)

    /**
     * Driver Routes
    */
    app.get('/api/driver/', deliveryManager, DriverController.index);
    app.get('/api/driver/:id', deliveryManager, DriverController.show);
    app.post('/api/driver/', upload, DriverController.store);
    app.post('/api/driver/login', DriverController.loginDriver);
    app.delete('/api/driver/:id', deliveryManager, DriverController.destroy);
    app.put('/api/driver/validateDriver/:id', adminAuth, DriverController.validateDriver);
    app.put('/api/driver/driverBonus/:id', driverAuth, DriverController.driverBonus);
    app.put('/api/driver/:id', deliveryManager, DriverController.update)
    app.post('/api/driver/resetPassword', DriverController.resetPassword)

    /**
     * Delivery Routes
        */
    app.get('/api/delivery/', deliveryManager, DeliveryController.index);
    app.get('/api/delivery/:id', deliveryManager, DeliveryController.show);
    app.post('/api/delivery/', deliveryManager, DeliveryController.store);
    app.put('/api/delivery/acceptDelivery/:id', driverAuth, DeliveryController.AcceptDelivery);
    app.delete('/api/delivery/:id', deliveryManager, DeliveryController.destroy);
    app.put('/api/delivery/:id', deliveryManager, DeliveryController.update)

}
