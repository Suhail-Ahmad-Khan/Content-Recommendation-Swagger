var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
var json2csv = require('json2csv');
var fs = require('fs');

router.post("/", function(req, res) {
    try {
      var selectedEngineer = req.body.selectedEngineer;
      commonMethod.verifyToken(req.header("x-token"));      //Authentcating users token
 var fieldNames=['Engineer ID','Emplyee Name', 'Account Number', ' Bank Name ', 'IFSC code', 'Pay Salary'];

  var fields=['engineerId','emplyeeName', 'accountNumber', 'bankName', 'ifscCode', 'paySalary'];

  var data=[];
  selectedEngineer.forEach(function (key,value) {
    var temp = {"engineerId":"427188EI","emplyeeName":"Abhishek Ganguly","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"};
    temp.engineerId=key;
    data.push(temp);
  });
              var csvData = json2csv({ data, fields,fieldNames });
              res.setHeader('Content-disposition', 'attachment; filename=salaryReport.csv');
                res.set('Content-Type', 'text/csv');
                res.send(csvData);
    } catch (e) {
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
{"engineerId":"427189EI","emplyeeName":"Suyash Nanda","accountNumber":"1234657998","bankName":"BOM", "ifscCode":"MAHB00448", "paySalary":"Yes"},
{"engineerId":"427190EI","emplyeeName":"Laxman Nakka","accountNumber":"1234657998","bankName":"BOI", "ifscCode":"BOI00027", "paySalary":"Yes"},
{"engineerId":"427191EI","emplyeeName":"Mohammad Chhotta","accountNumber":"1234657998","bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"},
{"engineerId":"427192EI","emplyeeName":"Suhail Khan","accountNumber":"1234657998", "bankName":"BOM", "ifscCode":"MAHB00001", "paySalary":"Yes"},
{"engineerId":"427193EI","emplyeeName":"Amit Singh","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"},
{"engineerId":"427194EI","emplyeeName":"Prashant Sharma","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"},
{"engineerId":"427195EI","emplyeeName":"Mukesh Shabanam","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"},
{"engineerId":"427196EI","emplyeeName":"Madhu Mati","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"},
{"engineerId":"427195EI","emplyeeName":"Pushpa","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"},
{"engineerId":"427195EI","emplyeeName":"Seeta","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"},
{"engineerId":"427195EI","emplyeeName":"Maya Singh","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"}

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
