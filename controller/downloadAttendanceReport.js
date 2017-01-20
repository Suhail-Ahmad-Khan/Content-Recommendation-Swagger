var express = require('express');
var router = express.Router();
var pdf = require('html-pdf');
var options = {format: 'Letter'};
var fs = require('fs');
var pdf = require('html-pdf');
// var html = fs.readFileSync('./views/attendance.html', 'utf8');
// var options = { format: 'Letter' };
//
// pdf.create(html, options).toFile('./attendance/businesscard.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });
router.post("/",function (req, res) {
  try {
var info = {
"Company": "ABC",
"Team": "JsonNode",
"Number of members": 4,
"Time to finish": "1 day"
}

res.render('attendance.html', {
info: info
}, function (err, HTML) {
  console.log("working",HTML,err);
/*pdf.create(HTML, options).toFile('./attendance/attendance.pdf', function (err, result) {
   if (err) {
       return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
       });
   }
})*/
});
} catch (e) {
  console.log(e);
    res.status(401).send("Bad Parameter or invalid token");
}
});
module.exports = router;
