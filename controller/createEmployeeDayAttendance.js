var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.post("/", function(req, res) {
    try {
        var tempData = req.body;
        var temp = {};
        temp.attendanceStatus = tempData.attendanceStatus;
        temp.markedStatus = tempData.markedStatus;
        temp.punchIn = tempData.punchIn;
        temp.punchOut = tempData.punchOut;
        temp.reason = tempData.reason;

        var date = commonMethod.getFullTimeStamp(tempData.timeStamp);
        commonMethod.createEmployeeAttendance(tempData.engineerId, date,temp).then(function() {
          deriveDataEvent.creatEmployeeUnmarkedAttendance(tempData.engineerId, date);
            res.send({
                token: tempData.token,
                engineerId: tempData.engineerId,
                timeStamp: tempData.timeStamp,
                status: 200,
                message: "Successfully Added"
            });
        }).catch(function() {
            res.status(500).send("error");
        })

    } catch (e) {

    }

});

module.exports = router;
