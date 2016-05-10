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
            if(text === "/start") {
                setTimeout(function() {
                    fbapi.sendTextMessage(sender, "Bestellung ist fertig zum abholen.");
                }, 10*1000);
                fbapi.sendTextMessage(sender, "Deine Bestellung wir bearbeitet.");
            }
            fbapi.sendTextMessage(sender, text);
        }
    }
    res.sendStatus(200);
});


module.exports = api;