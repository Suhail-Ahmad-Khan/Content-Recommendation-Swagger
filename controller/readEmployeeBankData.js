var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/",function(req,res){
  try {

  var tempData = req.query;
commonMethod.readEmployeeByFieldData(tempData.engineerId,"bank").then(function(data){
  var tempObj={};
  tempObj.bankData=data;
  tempObj.token=tempData.token;
  deriveDataEvent.employeeSnapshot(tempObj,tempData.engineerId);
  deriveDataEvent.once("employeeSnapshot",function(obj){
    res.send(obj);
  });

}).catch(function(){
  res.status(304).send("engineerId invalid");
});
} catch (e) {
  res.status(401).send("Bad Parameter or invalid token");
}
});

module.exports=router;
