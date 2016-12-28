var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/",function(req,res){
  var tempData = req.query;
commonMethod.readEmployeeByFieldData(tempData.engineerId,"hrData").then(function(data){
  var tempObj={};
  tempObj.hrData=data;
  tempObj.token=tempData.token;
  deriveDataEvent.employeeSnapshot(tempObj,tempData.engineerId);
  deriveDataEvent.once("employeeSnapshot",function(obj){
    res.send(obj);
  });

}).catch(function(){
  res.status(404).send("engineerId invalid");
});
});

module.exports=router;
