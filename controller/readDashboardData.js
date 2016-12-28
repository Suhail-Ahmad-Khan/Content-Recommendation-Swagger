var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/", function(req, res) {
  try {

    res.send({
        'attendanceSummary': {
            'marked': '67',
            'unmarked': '03'
        },
        'attendanceFallout': {
            'falloutNumber': '7',
            'totalEmployee': '58'
        },
        'leaveSummary': {
            'leave': '12'
        },
        'timeStamp': '1477308028'
    });
  } catch (e) {
    res.status(304).send("Bad Parameter");
  }
});

module.exports = router;
