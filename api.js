var express = require("express");
var fbapi = require("./fbapi");

var api = express.Router();

api.get("/", function(req, res) {
    if (req.query["hub.verify_token"] === "machauf") {
        res.send(req.query["hub.challenge"]);
    } else {
        res.json({
            message:"L//P facebook API!"
        });
    }
});

api.post("/", function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message && event.message.text) {
            text = event.message.text;
            // Handle a text message from this sender
            //console.log("%s: %s", sender, text);
            fbapi.sendTextMessage(sender, text);
        }
    }
    res.sendStatus(200);
});


module.exports = api;