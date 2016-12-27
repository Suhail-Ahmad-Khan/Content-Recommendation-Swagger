var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.get("/", function(req, res) {
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
});

module.exports = router;
