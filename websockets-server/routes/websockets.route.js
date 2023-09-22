const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events.controller")
const middleware = require("../middleware/middleware")
router.get('/trigger-event', middleware, eventsController.itemsEvents)

module.exports = router