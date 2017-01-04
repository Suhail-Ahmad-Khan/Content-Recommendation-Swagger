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
            timeStamp -= 86400000;
            date = commonMethod.getFullTimeStamp(timeStamp);

        deriveDataEvent.readTotalEmployee();
        deriveDataEvent.on("totalEmployee", function(data) {
            totalEmployee = data;
        });

        var promise1 = deriveDataEvent.readEmployeeUnmarkedAttendance(date, 1).then(function(data) {
          unmarked = data.unmarked;
        });
        date = commonMethod.getMonthTimeStamp(timeStamp),
        days = commonMethod.monthDays(timeStamp);
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

    } catch (e) {
      console.log(e);
        res.status(304).send("Bad Parameter");
    }
});

module.exports = router;
