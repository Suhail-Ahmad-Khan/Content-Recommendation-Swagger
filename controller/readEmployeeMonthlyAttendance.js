var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
/**  **/
router.get("/",function(req,res){

  try {
    var token = req.query.token,
        engineerId = req.query.engineerId,
        timeStamp = req.query.timeStamp,
        date = commonMethod.getMonthTimeStamp(timeStamp),
        time = date.split("/"),
        today = commonMethod.getMonthTimeStamp(Date.now()).split("/");
        if(time[0]<today[0] || (time[0]<=today[0] && time[1]<=today[1])){
        commonMethod.readEmployeeAttendance(engineerId,date).then(function(data){
          var tempObj={token};
          tempObj.attendanceData=data;
          deriveDataEvent.employeeSnapshot(tempObj,engineerId);
          deriveDataEvent.once("employeeSnapshot",function(obj){
            res.send(obj);
          });
        }).catch(function(){
              res.status(404).send("user is not available or no Attendance entry");
        });
      }else {
        res.status(404).send("No Attendance entry for ::"+date);
      }

  } catch (e) {
    res.status(401).send("Bad Parameter or invalid token");
  }
});

module.exports=router;
