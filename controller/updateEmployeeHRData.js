var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var employeeSnapshotEvent = require("../common/events");

router.put("/",function(req,res){
  try {
    var temp = req.body;
    var obj= {};
    obj.blStartDate=temp.blStartDate;
    obj.hiringCity=temp.hiringCity;
    obj.fellowshipPeriod = temp.fellowshipPeriod;
    obj.employeeStatus = temp.employeeStatus;
    obj.company = temp.company;
    obj.companyJoinDate = temp.companyJoinDate;
    obj.companyLeaveDate = temp.companyLeaveDate;
    obj.enggContractInitiated = temp.enggContractInitiated;
    obj.enggContractSigned = temp.enggContractSigned;
    obj.compContractInitiated = temp.compContractInitiated;
    obj.compContractSigned = temp.compContractSigned;
    obj.contractSignDate = temp.contractSignDate;
    obj.initiateTransfer = temp.initiateTransfer;
  commonMethod.updateEmployeeData(temp.engineerId,"hrData",obj).then(function(){
    employeeSnapshotEvent.updateEmployeeHRSnapshot(temp.engineerId,obj);
    res.send({"token":temp.token,"status":200,"message":"Successfully Updated"});
  }).catch(data=>{res.status(404).send("User Not Found")});
} catch (e) {
  res.status(401).send("Bad Parameter or invalid token");
  }

});

module.exports=router;
