var express = require('express');
var csv = require('express-csv');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
var csv = require('csv');
var fs = require('fs');

router.post("/", function(req, res) {
    try {
      var employeeList = req.body.employeeList;
      console.log(employeeList);
// var fields = ['name', 'phone', 'mobile', 'email', 'address', 'notes'];
var docs = [['Engineer ID','Emplyee Name', 'Account Number', ' Bank Name ', 'IFSC code', 'paySalary'],
            ["427188EI","Abhishek Ganguly","1234657998", "SBI", "SBI00027", "Yes"],
            ["427189EI","Suyash Nanda","1234657998", "BOM", "MAHB00448", "Yes"],
            ["427190EI","Laxman Nanda","1234657998", "BOI", "BOI00027", "Yes"],
            ["427191EI","Mohammad Chhotta","1234657998", "SBI", "SBI00027", "Yes"],
            ["427192EI","Suhail Khan","1234657998", "BOM", "MAHB00001", "Yes"],
            ["427193EI","Amit Singh","1234657998", "SBI", "SBI00027", "Yes"],
            ["427194EI","Prashant Sharma","1234657998", "SBI", "SBI00027", "Yes"],
            ["427195EI","Mukesh Shabanam","1234657998", "SBI", "SBI00027", "Yes"],
            ["427196EI","Madhu Mati","1234657998", "SBI", "SBI00027", "Yes"],
            ["427195EI","Pushpa","1234657998", "SBI", "SBI00027", "Yes"],
            ["427195EI","Seeta","1234657998", "SBI", "SBI00027", "Yes"],
            ["427195EI","Maya Singh","1234657998", "SBI", "SBI00027", "Yes"]];


    res.send({"csvData":docs});
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
