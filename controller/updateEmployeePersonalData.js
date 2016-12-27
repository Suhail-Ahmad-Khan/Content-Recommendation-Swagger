var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var employeeSnapshotEvent = require("../common/events");

router.put("/", function(req, res) {
    try {
        var temp = req.body;
        var obj = {};
        obj.employeeName = temp.employeeName;
        obj.emailId = temp.emailId;
        obj.mobile = temp.mobile;
        obj.dateOfBirth = temp.dateOfBirth;
        obj.fatherName = temp.fatherName;
        obj.fatherMobile = temp.fatherMobile;
        obj.occupation = temp.occupation;
        obj.annualSalary = temp.annualSalary;
        obj.mumbaiAddress = temp.mumbaiAddress;
        obj.permenantAddress = temp.permenantAddress;
        commonMethod.updateEmployeeData(temp.engineerId, "personal", obj).then(function() {
            employeeSnapshotEvent.updateEmployeePersonalSnapshot(temp.engineerId, obj);
            res.send({
                "token": temp.token,
                "status": 200,
                "message": "Successfully Updated"
            });
        });
    } catch (e) {
        res.status(304).send("Bad Parameter");
    }

});

module.exports = router;
