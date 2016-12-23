var express = require('express');
var router = express.Router();

  router.use("/userValidate",require("./userValidate"));
  router.use("/login",require("./login"));
  router.use("/readEmployeeMonthlyAttendance",require("./readEmployeeMonthlyAttendance"));
  router.use("/readEmployeeDayAttendance",require("./readEmployeeDayAttendance"));

module.exports = router;
