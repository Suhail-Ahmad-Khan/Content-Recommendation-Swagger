var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt    = require('jsonwebtoken');
var app = express();

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static("./public"));
app.use(morgan("dev"));
app.use(require("./controller/index"));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
