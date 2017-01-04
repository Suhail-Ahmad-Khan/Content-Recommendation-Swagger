var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
var nodemailer = require('nodemailer');

router.post("/", function(req, res) {
    try {
        var temp = req.body;
        var timeStamp = temp.timeStamp;
        res.send({
            timeStamp,
            'status': 200,
            'message': 'Successfully sent mail to users'
        });
        sendMailTo()
    } catch (e) {
        res.status(304).send("Bad Parameter");
    }
});

module.exports = router;


function sendMailTo() {
  // create reusable transporter object using the default SMTP transport
  // var smtpConfig = {
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true, // use SSL
  //     auth: {
  //         user: 'noorihamid1994@gmail.com',
  //         pass: 'sayham2009'
  //     }
  // };
  // 'smtps://noorihamid1994%40gmail.com:sayham2009@smtp.gmail.com'
  var transporter = nodemailer.createTransport('smtps://noorihamid1994%40gmail.com:sayham2009@smtp.gmail.com');
  // var transporter = nodemailer.createTransport({
  //         service: 'Gmail',
  //         auth: {
  //             user: 'noorihamid1994@gmail.com', // Your email id
  //             pass: 'sayham2009' // Your password
  //         }
  //     });
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Hamid Raza Noori" <noorihamid1994@gmail.com>', // sender address
      to: 'hamidabdul1994@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}
