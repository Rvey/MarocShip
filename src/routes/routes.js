const express = require('express')
const router = express()
const manager = require('./manager.routes')
const admin = require('./admin.routes')
const driver = require('./driver.routes')
const delivery = require('./delivery.routes')

router.use("/manager/", manager)
router.use("/admin/", admin)
router.use("/driver/", driver)
router.use("/delivery/", delivery)

module.exports = router