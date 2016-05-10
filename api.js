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

// INSERT DIRTY CODE HERE
api.post("/", function (req, res) {
    var messaging_events = req.body.entry[0].messaging;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text;
            if(text === "/start") {
                setTimeout(function() {
                    fbapi.sendTextMessage(sender, "Hurra! Deine Bestellung wurde verschickt.");
                }, 10*1000);
                fbapi.sendTextMessage(sender, "Deine Bestellung wird verarbeitet.");
            } else {
                // echo message
                fbapi.sendTextMessage(sender, text);
            }
        }
    }
    res.sendStatus(200);
});

module.exports = api;