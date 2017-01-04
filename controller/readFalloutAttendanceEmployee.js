var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

// deriveDataEvent.readFalloutEmployee("2016/11",30).then(function(data){
//   console.log(data);
// });
router.get("/",function(req,res){
try {
  var timeStamp = req.query.timeStamp,
  date = commonMethod.getMonthTimeStamp(timeStamp),
  days = commonMethod.monthDays(timeStamp);
   deriveDataEvent.readFalloutEmployee(date,days).then(function(data){
     deriveDataEvent.readEmployeeSnapshot(data).then(function(employee){
      res.send({timeStamp,"falloutEmployee":employee.employeeSnapshot,"totalEmployee":employee.totalEmployee});
     });
   });

} catch (e) {
    res.status(304).send("Bad Parameter");
}
});

  module.exports = router;
