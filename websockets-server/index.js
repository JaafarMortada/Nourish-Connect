const express = require("express");
const Pusher = require("pusher");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const websocketRoutes = require('./routes/websockets.route')
app.use("/ws", websocketRoutes)

app.listen(6001, (err) => {
    if (err) {
        throw err
    }
    console.log("server is running on port: ", 6001)
})
