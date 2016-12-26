
var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");

router.put("/",function(req,res){
  try {
    var temp = req.body;
    var obj= {};
    obj.accountNumber=temp.accountNumber;
    obj.bankName=temp.bankName;
    obj.ifscCode=temp.ifscCode;
    obj.pan=temp.pan;
    obj.paySalary=temp.paySalary;
    obj.reason=temp.reason;

  commonMethod.updateEmployeeData(temp.engineerId,"bank",obj).then(function(){
    res.send({"token":temp.token,"status":200,"message":"Successfully Updated"});
  });
} catch (e) {
    res.status(304).send("Bad Parameter");
  }

});

module.exports=router;
