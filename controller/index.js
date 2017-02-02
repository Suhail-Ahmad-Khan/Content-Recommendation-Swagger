var express = require('express');
var router = express.Router();
var deriveDataEvent = require("../common/events");


  router.use("/userValidate",require("./userValidate"));
  router.use("/login",require("./login"));
  router.use("/signup",require("./signup"));
  router.use("/readEmployeeMonthlyAttendance",require("./readEmployeeMonthlyAttendance"));
  router.use("/readEmployeeDayAttendance",require("./readEmployeeDayAttendance"));
  router.use("/createEmployeeDayAttendance",require("./createEmployeeDayAttendance"));
  router.use("/searchEmployeeByName",require("./searchEmployeeByName"));

  router.use("/readEmployeeHRData",require("./readEmployeeHRData"));
  router.use("/readEmployeePersonalData",require("./readEmployeePersonalData"));
  router.use("/readEmployeeProfileData",require("./readEmployeeProfileData"));
  router.use("/readEmployeeBankData",require("./readEmployeeBankData"));
  router.use("/readEmployeeTrackingData",require("./readEmployeeTrackingData"));

  router.use("/updateEmployeeHRData",require("./updateEmployeeHRData"));
  router.use("/updateEmployeePersonalData",require("./updateEmployeePersonalData"));
  router.use("/updateEmployeeProfileData",require("./updateEmployeeProfileData"));
  router.use("/updateEmployeeTrackingData",require("./updateEmployeeTrackingData"));
  router.use("/updateEmployeeBankData",require("./updateEmployeeBankData"));

  router.use("/readLeaveEmployee",require("./readLeaveEmployee"));
  router.use("/readFalloutAttendanceEmployee",require("./readFalloutAttendanceEmployee"));
  router.use("/readUnmarkedAttendanceEmployee",require("./readUnmarkedAttendanceEmployee"));
  router.use("/readMonthlyAttendanceSummary",require("./readMonthlyAttendanceSummary"));
  router.use("/readDashboardData",require("./readDashboardData"));

  router.use("/sendEmailToUnmarkedEmployee",require("./sendEmailToUnmarkedEmployee"));
  router.use("/sendEmailToFalloutEmployee",require("./sendEmailToFalloutEmployee"));
  router.use("/sendEmailToLeaveEmployee",require("./sendEmailToLeaveEmployee"));

  router.use("/readAllEmployee",require("./readAllEmployee"));
  router.use("/readInternEmployee",require("./readInternEmployee"));
  router.use("/downloadSalaryReport",require("./downloadSalaryReport"));
  router.use("/downloadAttendanceReport",require("./downloadAttendanceReport"));
  router.post("/dummy",function (req,res) {
    var data={};
    data.engineerId = req.body.engineerId;
    data.company = req.body.company;
    data.employeeName = req.body.employeeName;
    data.city = req.body.city;
    deriveDataEvent.dummy(JSON.stringify(data)).then(function (setData) {
      res.send(setData);
    })
  });
  router.get("/searchEmployee/:searchKey/:cursor",function (req,res) {
    var temp ="*"+req.params.searchKey+"*";
    var cursor = req.params.cursor || "0";
    deriveDataEvent.searchDummy(temp,cursor).then(function (data) {
      console.log(data);
      var tempData = data.searchKey.map(function (itm) {
        return JSON.parse(itm);
      });
        res.send({"searchValue":tempData,"cursor":data.cursor});
    })
  });

module.exports = router;
