var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
var json2csv = require('json2csv');
var fs = require('fs');

router.post("/", function(req, res) {
    try {
      var selectedCompany = req.body.selectedCompany;
      // commonMethod.verifyToken(req.header("x-token"));      //Authentcating users token
      var length = selectedCompany.length;
      var i = 0;
      var fileList = [];

      selectedCompany.forEach(function(value, key) {
        var fieldNames=['Engineer ID','Emplyee Name', 'Account Number', ' Bank Name ', 'IFSC code', 'Pay Salary'];

         var fields=['engineerId','emplyeeName', 'accountNumber', 'bankName', 'ifscCode', 'paySalary'];

         var data=[];
         selectedEngineer.forEach(function (key,value) {
           var temp = {"engineerId":"427188EI","emplyeeName":"Abhishek Ganguly","accountNumber":"1234657998", "bankName":"SBI", "ifscCode":"SBI00027", "paySalary":"Yes"};
           temp.engineerId=key;
           data.push(temp);
         });
                     var csvData = json2csv({ data, fields,fieldNames });
                     fs.writeFile('file.csv', csvData, function(err) {
                       if (err) throw err;
                       console.log('file saved');
                     });
        });

    } catch (e) {
        res.status(401).send("Bad Parameter or invalid token");
    }
});

module.exports = router;
