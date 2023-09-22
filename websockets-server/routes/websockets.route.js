const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events.controller")
const middleware = require("../middleware/middleware")
router.get('/trigger-items-event', middleware, eventsController.itemsEvents)
router.get('/trigger-donation-event', middleware, eventsController.donationsEvents)

module.exports = router