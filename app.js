var http = require('http'),
    util = require('util'),
    mu = require('mu2');
// var fs = require('fs');
var pdf = require('html-pdf');
var mu2Express = require("mu2express");
var express = require("express");
var app = express();
app.engine('mustache', mu2Express.engine);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
var info = {
        name: 'BridgeLabz',
        description: 'Some Data ABout BridgeLabz',
        terms: [{
            name: 't1',
            description: 'Some Data ABout BridgeLabz 1'
        }, {
            name: 't2',
            description: 'Some Data ABout BridgeLabz 2'
        }, ]
    }

app.get('/', function(req, res) {
    //Renders the Views/index.mustache file with the view {'test': 'somevalue'} using the mu2 engine
    res.render('index.html', info);
    });
app.listen(8080);
var options = {
    format: 'Letter'
};

// mu.root = __dirname + '/templates';

    // http.createServer(function (req, res) {

/*var stream = mu.compileAndRender('index.html', info);
stream.on("data", function(data) {
    console.log(data.toString());
    pdf.create(data.toString(), options).toFile('./attendance/attendance.pdf', function(err, result) {
        if (err) {
            console.log("err",err);
        } else {
            console.log("Done");
        }
    });
});*/
// }).listen(8000);
