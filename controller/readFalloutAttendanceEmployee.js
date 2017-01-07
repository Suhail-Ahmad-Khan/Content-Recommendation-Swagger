var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/",function(req,res){
try {
  var timeStamp = req.query.timeStamp,
  date = commonMethod.getMonthTimeStamp(timeStamp),
  days = commonMethod.monthDays(timeStamp);
   deriveDataEvent.readFalloutEmployee(date,days).then(function(data){
     deriveDataEvent.readEmployeeSnapshot(data).then(function(employee){
      res.send({timeStamp,"falloutEmployee":employee.employeeSnapshot,"falloutNumber":employee.employeeSnapshot.length,"totalEmployee":employee.totalEmployee});
     });
   });

} catch (e) {
  res.status(401).send("Bad Parameter or invalid token");
}
});

  module.exports = router;
