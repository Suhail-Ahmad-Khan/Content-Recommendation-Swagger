var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/",function(req,res){
  var tempData = req.query;
commonMethod.readEmployeeByFieldData(tempData.engineerId,"personal").then(function(data){
  console.log(data);
  var tempObj={};
  tempObj.personalData=data;
  tempObj.token=tempData.token;
  deriveDataEvent.employeeSnapshot(tempObj,tempData.engineerId);
  deriveDataEvent.once("employeeSnapshot",function(obj){
    res.send(obj);
  });

}).catch(function(){
  res.status(304).send("engineerId invalid");
});
});

module.exports=router;
