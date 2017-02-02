var express = require('express');
var router = express.Router();
var options = {format: 'Letter'};
var htmlToPdf = require('html-to-pdf');
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
  htmlToPdf.convertHTMLString(template, './attendance/attendance.pdf',
    function (error, success) {
        if (error) {
            console.log('Oh noes! Errorz!');
            console.log(error);
        } else {
            console.log('Woot! Success!');
            console.log(success);
		res.send("Done");
        }
    }
);

})

} catch (e) {
    res.status(401).send("Bad Parameter or invalid token");
}
});
module.exports = router;
