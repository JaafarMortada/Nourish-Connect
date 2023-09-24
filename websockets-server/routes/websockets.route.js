const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events.controller")
const middleware = require("../middleware/middleware")
router.get('/trigger-items-event', middleware, eventsController.itemsEvents)
router.get('/trigger-donation-event', middleware, eventsController.donationsEvents)
router.get('/trigger-user-donation-event', middleware, eventsController.userDonationsEvents)
router.get('/trigger-user-discount-event', middleware, eventsController.userDiscountsEvents)
router.get('/trigger-cashier-login-event', middleware, eventsController.cashierLoginEvents)

module.exports = router