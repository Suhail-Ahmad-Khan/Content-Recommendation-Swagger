var express = require('express');
var router = express.Router();

  router.use("/userValidate",require("./userValidate"));
  router.use("/login",require("./login"));
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

module.exports = router;
