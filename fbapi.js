// token is set on server environment
var token = process.env["FB_TOKEN"];
var request = require("request");

var fbapi = {};

fbapi.sendTextMessage = function (sender, text) {
    console.log(token);

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: {
                text: text
            }
        }
    }, function (error, response, body) {
        if (error) {
            console.error('Error sending message: ', error);
            console.error(body);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

module.exports = fbapi;