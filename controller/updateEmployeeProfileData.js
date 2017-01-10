var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");

router.put("/",function(req,res){
  try {
    var temp = req.body;
    var obj= {};
console.log(req.body);
    obj.diploma=temp.diploma;
    obj.degree=temp.degree;
    obj.discipline=temp.discipline;
    obj.yearOfPassing=temp.yearOfPassing;
    obj.aggregateIn=temp.aggregateIn;
    obj.finalYearPercentage=temp.finalYearPercentage;
    obj.trainingInstitute=temp.trainingInstitute;
    obj.trainingPeriod=temp.trainingPeriod;
    obj.training=temp.training;

  commonMethod.updateEmployeeData(temp.engineerId,"educational",obj).then(function(){
    res.send({"token":temp.token,"status":200,"message":"Successfully Updated"});
  }).catch(data=>{res.status(404).send("User Not Found")});
} catch (e) {
  res.status(401).send("Bad Parameter or invalid token");
  }

});

module.exports=router;
