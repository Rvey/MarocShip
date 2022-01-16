const express = require('express')
const router = express()
const manager = require('./manager.routes')
const admin = require('./admin.routes')
const driver = require('./driver.routes')

router.use("/manager/", manager)
router.use("/admin/", admin)
router.use("/driver/", driver)

module.exports = router