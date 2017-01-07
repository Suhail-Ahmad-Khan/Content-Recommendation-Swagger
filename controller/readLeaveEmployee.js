var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/",function(req,res){
try {
  var timeStamp = req.query.timeStamp,
  date = commonMethod.getMonthTimeStamp(timeStamp),
  days = commonMethod.monthDays(timeStamp);
   deriveDataEvent.readLeaveEmployee(date,days).then(function(data){
     deriveDataEvent.readEmployeeSnapshot(data).then(function(employee){
      res.send({timeStamp,"leaveOutEmployee":employee.employeeSnapshot,"employeLeave":employee.employeeSnapshot.length,"totalEmployee":employee.totalEmployee});
     });
   });

} catch (e) {
  console.log(e);
    res.status(304).send("Bad Parameter");
}
});

  module.exports = router;
