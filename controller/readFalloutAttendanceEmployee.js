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
  days = monthDays(timeStamp);
   deriveDataEvent.readFalloutEmployee(date,days).then(function(data){
     res.send(data);
   });

} catch (e) {
    res.status(304).send("Bad Parameter");
}
});

  module.exports = router;
  function monthDays(time) {
      var date = new Date(Number.parseInt(time));
      var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return d.getDate();
  }
