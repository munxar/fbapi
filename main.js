var path = require("path");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var request = require("request");
var api = require("./api");

var app = express();

// logger
app.use(morgan("combined"));
// parse body as json
app.use(bodyParser.json());
// serve directory "public"
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);

app.listen(3000, function(err) {
    if(err) throw err;
    console.log("server runinng at http://localhost:3000");
});
