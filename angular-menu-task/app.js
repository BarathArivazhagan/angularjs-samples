var express = require('express');
var app = express();
var path = require('path');

app.use("/js",express.static(path.join(__dirname + '/js')));
app.use("/node_modules",express.static(path.join(__dirname + '/node_modules')));
app.use("/css",express.static(path.join(__dirname + '/css')));
app.use("/",express.static(path.join(__dirname)));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);
