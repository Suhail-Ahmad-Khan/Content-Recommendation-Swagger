var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/", function(req, res) {
    try {
        deriveDataEvent.searchEmployee();
        deriveDataEvent.once("employeeList",function(employeeList,employeeSnapshot){
        if(employeeList.length!==0){
          deriveDataEvent.readEmployeeSnapshot(employeeList).then(function(data){
            res.send({"employeeList":data.employeeSnapshot});
          });
        }else {
          res.status(404).send("Not Employee available");
        }

        });
    } catch (e) {
        res.status(401).send("Bad Parameter or invalid token");
    }
});

module.exports = router;
