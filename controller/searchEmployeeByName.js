var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/", function(req, res) {
    try {
      console.log("searching..");
        deriveDataEvent.searchEmployee();
        deriveDataEvent.once("employeeList",function(employeeList){
        if(employeeList.length!==0){
          deriveDataEvent.readEmployeeSnapshot(employeeList).then(function(data){
            res.send({"employeeList":data.employeeSnapshot});
          });
        }else {
          res.status(404).send("Not Employee availble");
        }

        });
    } catch (e) {
        console.log(e);
        res.status(304).send("Bad Parameter");
    }
});

module.exports = router;
