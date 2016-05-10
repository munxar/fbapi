var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");

var app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", function(req, res) {
	if (req.query["hub.verify_token"] === "machauf") {
    		res.send(req.query["hub.challenge"]);
  	} else {
		res.json({
			message:"L//P facebook API!"
		});
	}
});


app.post("/api/", function (req, res) {
    console.log(JSON.stringify(req.body));

  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
        if(text === "/start") {
            setTimeout(function() {
                sendTextMessage(sender, "Bestellung ist fertig zum abholen.");
            }, 10*1000);
            sendTextMessage(sender, "Deine Bestellung wir bearbeitet.");
        }
        sendTextMessage(sender, text);
    }
  }
  res.sendStatus(200);
});

app.listen(3000);

// token is set on server environment
var token = process.env["FB_TOKEN"];

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  };

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData
    }
  }, function(error, response, body) {
    console.log(response);

    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}
