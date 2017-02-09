var express = require('express');
var router = express.Router();
var zip = require('express-zip');
var options = {
    format: 'Letter'
};
var path = require('path');
var htmlToPdf = require('html-to-pdf');
var mu = require("mu2");
var archiver = require('archiver');
var fs = require('fs');
var options = {
    format: 'Letter'
};

router.post("/", function(req, res) {
    try {
        var selectedCompany = req.body.selectedCompany;
        // commonMethod.verifyToken(req.header("x-token"));      //Authentcating users token
        var dummy = {
            "engineerName": "ABC",
            "engineerId": "40001EI",
            "attendanceData": [{
                "date": "26 January 2017",
                "reason": "Not Feeling"
            }, {
                "date": "2 Feb 2017",
                "reason": "Personal Work"
            }]
        }
        var length = selectedCompany.length;
        var i = 0;
        var fileList = [];

        var p = selectedCompany.forEach(function(value, key) {
            var temp = {};
            temp.companyName = value.companyName;
            temp.engineerList = [];
            value.engineerList.forEach(function(value, key) {
                dummy.engineerId = value;
                temp.engineerList.push(dummy);
            });

            //Generating HTML template
            var stream = mu.compileAndRender('views/dummy.html', temp);
            var template = "";
            stream.on("data", function(data) {
                template += data.toString();
            });
            stream.once("end", function(data) {
                var fileName = 'attendance/attendance-' + temp.companyName + '.pdf';
                fileList.push({"path":fileName,"name":path.basename(fileName)});
                htmlToPdf.convertHTMLString(template, fileName,
                    function(error, success) {
                        if (error) {
                            console.log('Oh noes! Errorz!');
                            console.log(error);
                        } else {
                          i++;
                            if (i === length) {
                              // console.log(fileList);
                              res.zip(fileList,'report.zip');
                                /*var output = fs.createWriteStream('report.zip');
                                // var archive = archiver('zip');
                                var archive = archiver('zip', {
                                    store: true // Sets the compression method to STORE.
                                });

                                // listen for all archive data to be written
                                output.on('close', function() {
                                  res.sendFile("report.zip");
                                  // res.send("done");
                                    console.log(archive.pointer() + ' total bytes');
                                    console.log('archiver has been finalized and the output file descriptor has closed.');
                                });
                                // good practice to catch this error explicitly
                                archive.on('error', function(err) {
                                    throw err;
                                });*/
                                // archive.on('close', function() {
                                //     // res.send("done");
                                //     console.log(archive.pointer() + ' total bytes');
                                //     console.log('archiver has been finalized and the output file descriptor has closed.');
                                // });
                                // // good practice to catch this error explicitly
                                // archive.on('error', function(err) {
                                //     throw err;
                                // });


                                // res.attachment('report.zip');
                                /*archive.pipe(output);

                                	fileList.forEach(function(value,key){
                                	// archive.append(fs.createReadStream(value), { name: value });
                                  archive.file(value, { name: path.basename(value)});

                                	});

                                  // archive.pipe(output);
                                  archive.finalize();*/
                            }
                        }
                    });
                mu.clearCache();
            });
        });
        Promise.all([p]).then(function() {
            console.log(done);
        })
    } catch (e) {
        res.status(401).send("Bad Parameter or invalid token");
    }
});
module.exports = router;
