var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/", function(req, res) {
    try {
        var today = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate(),
            timeStamp =  Number.parseInt(req.query.timeStamp),
            date,
            obj = {},
            monthAttendance = [],
            totalEmployee,
            falloutEmployee,
            unmarked;
            timeStamp -= 86400000;  //Giving 1 day back data
            date = commonMethod.getFullTimeStamp(timeStamp);
            time = date.split("/");
            // if(time[0]<=new Date().getFullYear() && time[1]<=new Date().getMonth()){
            commonMethod.verifyToken(req.query.token);

        deriveDataEvent.readTotalEmployee();
        deriveDataEvent.on("totalEmployee", function(data) {
            totalEmployee = data;
        });

        var promise1 = deriveDataEvent.readEmployeeUnmarkedAttendance(date, 1).then(function(data) {
          unmarked = data.unmarked;
        });
        date = commonMethod.getMonthTimeStamp(timeStamp),
        days = commonMethod.monthDays(timeStamp),
        time = date.split("/");
        console.log(new Date().getMonth());
        if(time[0]<new Date().getFullYear() || (time[0]<=new Date().getFullYear() && time[1]<=(new Date().getMonth()+1))){
         var promise2 =deriveDataEvent.readFalloutEmployee(date,days).then(function(data){
           falloutEmployee= data.length;
         });
        Promise.all([promise1,promise2]).then(function() {
            res.send({
                timeStamp,
                "attendanceSummary": {"marked":totalEmployee-unmarked,unmarked},
                'attendanceFallout': {
                        falloutEmployee ,
                        totalEmployee
                    },
                    'leaveSummary': {
                        'leave': '12'
                    }
            });
        });
      }else {
        res.status(404).send("No entry for ::"+date);
      }

    } catch (e) {
        res.status(401).send("Bad Parameter or invalid token");
    }
});

module.exports = router;
