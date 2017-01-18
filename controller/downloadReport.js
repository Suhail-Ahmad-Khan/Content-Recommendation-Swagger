var express = require('express');
var csv = require('express-csv');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
var csv = require('csv');
var fs = require('fs');

router.get("/", function(req, res) {
    try {

// var fields = ['name', 'phone', 'mobile', 'email', 'address', 'notes'];
var docs = [['Name', 'Phone', 'Mobile', 'Email', 'Address', 'Notes'],
            ['SOme Name1', 'Some Phone1', 'SOme Mobile1', 'Some Email1', 'Some Address1', 'Some Note1'],
            ['SOme Name2', 'Some Phone2', 'SOme Mobile2', 'Some Email2', 'Some Address2', 'Some Note2'],
            ['SOme Name3', 'Some Phone3', 'SOme Mobile3', 'Some Email3', 'Some Address3', 'Some Note3'],
            ['SOme Name4', 'Some Phone4', 'SOme Mobile4', 'Some Email4', 'Some Address4', 'Some Note4'],
            ['SOme Name5', 'Some Phone5', 'SOme Mobile5', 'Some Email5', 'Some Address5', 'Some Note5']];


    res.send(docs);
    } catch (e) {
      console.log(e);
        res.status(401).send("Bad Parameter or invalid token");
    }
});

module.exports = router;

/*
  commonMethod.readJSON("./reports/1.pdf").then(chunks=>{
  // var jsfile = new Buffer.concat(chunks).toString('base64');
  //  res.header("Access-Control-Allow-Origin", "*");
  //  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //  res.header('content-type', 'application/pdf');
  //  res.send(chunks);
  res.writeHead(200, {"Content-Type": "application/pdf"});
  res.write(chunks);
  res.end();
});


res.attachment('data.csv');
res.status(200).send(data);
console.log(res);

var jsfile = new Buffer.concat(chunks).toString('base64');
 console.log('converted to base64');
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 res.header('content-type', 'application/pdf');
 res.send(jsfile);


var filename = "1.jpg";
var filePath = path.join(__dirname, '..', 'reports', filename);
console.log(filePath);
var stat = fs.statSync(filePath);
var fileToSend = fs.readFileSync(filePath);
res.set('Content-Type', 'image/jpeg');
res.set('Content-Length', stat.size);
res.set('Content-Disposition', filename);
res.send(fileToSend);*/
