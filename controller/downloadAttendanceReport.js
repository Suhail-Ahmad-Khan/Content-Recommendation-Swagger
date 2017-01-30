var express = require('express');
var router = express.Router();
var options = {format: 'Letter'};
var pdf = require('html-pdf');
var mu = require("mu2");

var options = { format: 'Letter' };

router.post("/",function (req, res) {
  try {
// commonMethod.verifyToken(req.header("x-token"));      //Authentcating users token
var info = {
  name: 'BridgeLabz',
  description: 'Some Data'
};
//Generating HTML template
var stream = mu.compileAndRender('views/attendance.html', info);
var template = "";
stream.on("data",function (data) {
  template+=data.toString();
});

stream.once("end",function (data) {
  pdf.create(template, options).toFile('./attendance/attendance.pdf', function (err, result) {
       if (err) {
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           });
       }else {
         res.send("Done");
       }
    });
})

} catch (e) {
    res.status(401).send("Bad Parameter or invalid token");
}
});
module.exports = router;
