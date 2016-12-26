
var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");

router.put("/",function(req,res){
  try {
    var temp = req.body;
    var obj= {};
    obj.techStack =temp.techStack;
    obj.bridgelabzStartDate =temp.bridgelabzStartDate;
    obj.bridgelabzEndDate =temp.bridgelabzEndDate;
    obj.currentWeek =temp.currentWeek;
    obj.numberOfWeeksLeft =temp.numberOfWeeksLeft;
    obj.week1 =temp.week1;

  commonMethod.updateEmployeeData(temp.engineerId,"tracking",obj).then(function(){
    res.send({"token":temp.token,"status":200,"message":"Successfully Updated"});
  });
} catch (e) {
    res.status(304).send("Bad Parameter");
  }

});

module.exports=router;
