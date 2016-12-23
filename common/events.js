var EventEmitter = require('events').EventEmitter;
var util = require('util');
var firebase = require("../config/firebase.js");
var redisClient = require('redis').createClient();

function custEvent(){
var self = this;
EventEmitter.call(this);
}

util.inherits(custEvent, EventEmitter);
var myCustEvent = new custEvent();


module.exports = myCustEvent;

 custEvent.prototype.employeeSnapshot = function (tempObj,engineerId){
   redisClient.hgetall("employeeSnapshot",function(error,employeeData){
     if (employeeData === null || employeeData[engineerId]===undefined) {
      readEmployeeSnapshot(function(temp){
        tempObj.employeeData=JSON.parse(temp[engineerId]);
        myCustEvent.emit("employeeSnapshot",tempObj);
        redisClient.hmset("employeeSnapshot",temp);
      });
    }
      else{
        tempObj.employeeData=JSON.parse(employeeData[engineerId]);
        myCustEvent.emit("employeeSnapshot",tempObj);
      }
});
};


function readEmployeeSnapshot(callback) {
  var ref = firebase.database().ref("employee");
  ref.once("value",function(data){
    var temp = {};
    var data=data.val();
    for(var key in data){
        var tempObj = {};
        tempObj.employeeName = data[key].personal.employeeName;
        tempObj.status = data[key].hrData.status;//"Fellowship";//data[key].
        tempObj.company = data[key].hrData.company; //"BridgeLabz";
        tempObj.mobile = data[key].personal.mobile;
        tempObj.emailId = data[key].personal.emailId;
        tempObj.blStartDate = data[key].hrData.blStartDate;
        tempObj.companyJoinDate = data[key].hrData.companyJoinDate;
        tempObj.companyLeaveDate = data[key].hrData.companyLeaveDate;
        tempObj.leaveTaken = 0;
        temp[key] = JSON.stringify(tempObj);
    }
    callback(temp);
  });

}
// "employeeName":"Aarti Patel","status":"Fellowship","company":"BridgeLabz","mobile":"9807654321","emailId":"arti@gmail.com",
// "blStartDate":"","companyJoinDate":"","companyLeaveDate":"","leaveTaken":"0"}}}
