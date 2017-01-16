var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
var nodemailer = require('nodemailer');

router.post("/", function(req, res) {
    try {
        var temp = req.body;
        var timeStamp = temp.timeStamp;
        var date = commonMethod.getFullTimeStamp(timeStamp);
        if(timeStamp===undefined || timeStamp===null || timeStamp=== ''){
          throw 400;
        }
        var promise = deriveDataEvent.readEmployeeUnmarkedAttendance(date).then(function(data){
            deriveDataEvent.readEmployeeSnapshot(data).then(function(engineerData){
            engineerData.employeeSnapshot.forEach(function(engineerData){
            sendMailTo(engineerData.emailId,engineerData.employeeName,date);
            });
          });
        });
         Promise.all([promise]).then(function() {
           res.send({
               timeStamp,
               'status': 200,
               'message': 'Successfully sent mail to users'
           });
        });
        //sendMailTo()
    } catch (e) {
      if(e===400)
      res.status(400).send("Bad Request Parameter");
      else
      res.status(401).send("Bad Parameter or invalid token");
    }
});

module.exports = router;


function sendMailTo(emailId,employeeName,date) {
  new Promise(function(resolve, reject) {

  var transporter = nodemailer.createTransport('smtps://noorihamid1994%40gmail.com:sayham2009@smtp.gmail.com');

  var mailOptions = {
      from: '"BridgeLabz Admin" <noorihamid1994@gmail.com>', // sender address
      to: emailId, // list of receivers'hamidabdul1994@gmail.com'
      subject: 'Regarding Attendance', // Subject line
      // text: 'Hello world ', // plaintext body
      html: '<b>Hello '+employeeName+'</b><br/><p>Please mark your Attendance for date:  '+date+'</p>Mark Attendance using <a href="http://localhost/fundooHr">http://localhost/fundooHr</a><br/> Thanking you' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          reject(error);
      }else {
        resolve(info.response);
      }

      });
  });
}
