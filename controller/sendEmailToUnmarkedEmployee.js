var express = require('express');
var router = express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");

router.post("/", function(req, res) {
    try {
        var temp = req.body;
        var timeStamp = temp.timeStamp;
        res.send({
            timeStamp,
            'status': 200,
            'message': 'Successfully sent mail to users'
        });
    } catch (e) {
        res.status(304).send("Bad Parameter");
    }
});

module.exports = router;
