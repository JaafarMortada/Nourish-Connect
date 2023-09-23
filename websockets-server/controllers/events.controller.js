const Pusher = require("pusher");
require("dotenv").config();


const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
});

const itemsEvents = (req, res) => {
    const inventoryId = req.query.inventory_id;
    pusher.trigger(`inventory-${inventoryId}`, "items-data-updated", {});
    res.json({ message: "websocket sent" })
}


const donationsEvents = (req, res) => {
    const receiver_id = req.query.receiver_id;
    pusher.trigger(`donation-${receiver_id}`, "donation-data-updated", {});
    res.json({ message: "websocket sent" })
}

const cashierLoginEvents = (req, res) => {
    const inventoryId = req.query.inventory_id;
    pusher.trigger(`cashier-login-${inventoryId}`, "cashier-logged-in", {});
    res.json({ message: "websocket sent" })
}

module.exports = {
    itemsEvents,
    donationsEvents,
    cashierLoginEvents,

}
