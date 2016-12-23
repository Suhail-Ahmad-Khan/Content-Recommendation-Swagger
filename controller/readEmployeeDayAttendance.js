var express = require('express');
var router = express.Router();
var firebase = require("../config/firebase.js");
var commonMethod = require("../common/commonMethod");
/**  **/
router.get("/",function(req,res){
try {
  var token = req.query.token,
      engineerId = req.query.engineerId,
      timeStamp = req.query.timeStamp,
      date = commonMethod.getFullTimeStamp(timeStamp);

      commonMethod.readEmployeeAttendance(engineerId,date).then(function(data){
        data.token=token;
        data.timeStamp=timeStamp;
        data.engineerId=engineerId;
        res.send(data);
      }).catch(function(){
            res.status(404).send("user is not available or no Attendance entry");
      });

    } catch (e) {
      res.status(304).send("Bad Parameter");
    }
});


  module.exports=router;
