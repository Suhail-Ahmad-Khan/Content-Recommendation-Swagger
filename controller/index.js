var express = require('express');
var router = express.Router();

  router.use("/userValidate",require("./userValidate"));
  router.use("/login",require("./login"));
  router.use("/readEmployeeMonthlyAttendance",require("./readEmployeeMonthlyAttendance"));
  router.use("/readEmployeeDayAttendance",require("./readEmployeeDayAttendance"));
  router.use("/createEmployeeDayAttendance",require("./createEmployeeDayAttendance"));
  router.use("/readEmployeeHRData",require("./readEmployeeHRData"));
  router.use("/readEmployeePersonalData",require("./readEmployeePersonalData"));
  router.use("/readEmployeeProfileData",require("./readEmployeeProfileData"));
  router.use("/readEmployeeBankData",require("./readEmployeeBankData"));
  router.use("/readEmployeeTrackingData",require("./readEmployeeTrackingData"));

module.exports = router;
