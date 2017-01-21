var express = require('express');
var app = express();
var router = express.Router();
var options = {format: 'Letter'};
var fs = require('fs');
var pdf = require('html-pdf');
// app.set('view engine', 'mu2');
var mu = require("mu2");

// var html = fs.readFileSync('./views/attendance.html', 'utf8');
var options = { format: 'Letter' };
//
// pdf.create(html, options).toFile('./attendance/businesscard.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });
router.post("/",function (req, res) {
  try {
/*var info = {
"company": "ABC",
"team": "JsonNode",
"number": 4,
"time": "1 day"
}*/
var info = {
  name: 'BridgeLabz',
  description: '',
  terms: [
    {name: 't1', index: 0},
    {name: 't2', index: 1},
  ]
}
var stream = mu.compileAndRender('views/attendance.html', info);

stream.on("data",function (data) {
  console.log(data.toString());
  pdf.create(data.toString(), options).toFile('./attendance/attendance.pdf', function (err, result) {
     if (err) {
         return res.status(400).send({
             message: errorHandler.getErrorMessage(err)
         });
     }else {
       res.send("Done");
     }
  });
});
// stream.pipe(res);
console.log("running..");
// compileAndRender
  // .on('data', function (data) {

    /*pdf.create(data.toString(), options).toFile('./attendance/attendance.pdf', function (err, result) {
       if (err) {
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           });
       }else {
         res.send("Done");
       }
    });*/

  // });
  // res.send("Done");
// res.render('attendance.html', {
// info: info
// }, function (err, HTML) {
//   console.log("working",HTML,err);
// /*pdf.create(HTML, options).toFile('./attendance/attendance.pdf', function (err, result) {
//    if (err) {
//        return res.status(400).send({
//            message: errorHandler.getErrorMessage(err)
//        });
//    }
// })*/
// });
} catch (e) {
  console.log(e);
    res.status(401).send("Bad Parameter or invalid token");
}
});
module.exports = router;
