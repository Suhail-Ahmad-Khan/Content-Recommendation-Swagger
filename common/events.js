var EventEmitter = require('events').EventEmitter;
var util = require('util');
var firebase = require("../config/firebase.js");
var redisClient = require('redis').createClient();


function custEvent() {
    var self = this;
    EventEmitter.call(this);
}

util.inherits(custEvent, EventEmitter);
var myCustEvent = new custEvent();


module.exports = myCustEvent;


/****          employeeSnapshot Method       ****/
custEvent.prototype.employeeSnapshot = function(tempObj, engineerId) {
    redisClient.hgetall("employeeSnapshot", function(error, employeeData) {
        if (employeeData === null || employeeData[engineerId] === undefined) {
            readEmployeeSnapshot(function(temp) {
                tempObj.employeeData = JSON.parse(temp[engineerId]);
                myCustEvent.emit("employeeSnapshot", tempObj);
                redisClient.hmset("employeeSnapshot", temp);
            });
        } else {
            tempObj.employeeData = JSON.parse(employeeData[engineerId]);
            myCustEvent.emit("employeeSnapshot", tempObj);
        }
    });
};

custEvent.prototype.readEmployeeSnapshot = function(engineerId){
  return new Promise(function(resolve, reject) {
  redisClient.hgetall("employeeSnapshot", function(error, employeeData) {
    var obj =[];
    engineerId.forEach(function(id){
      obj.push(JSON.parse(employeeData[id]));
    });
    var totalEmployee = Object.keys(employeeData).length;
    resolve({"employeeSnapshot":obj,totalEmployee});
  });
});
}
custEvent.prototype.readTotalEmployee = function(){
redisClient.hgetall("employeeSnapshot", function(error, employeeData) {
  if(employeeData !==null)
  myCustEvent.emit("totalEmployee",Object.keys(employeeData).length);
});
};
/*****           readEmployeeUnmarkedAttendance Method    *****/
custEvent.prototype.readEmployeeUnmarkedAttendance = function(date,i) {
  return new Promise(function(resolve, reject) {
        redisClient.hgetall("employeeUnmarkedAttendance", function(error, employeeUnmarkedAttendance) {
                    if (employeeUnmarkedAttendance === null || employeeUnmarkedAttendance[date] === undefined) {
                        var ref = firebase.database().ref();
                        var empRef = ref.child("employee");
                        var markedRef = ref.child("employeeAttendance").orderByChild(date+"/markedStatus").startAt("");
                        markedRef.on("value", function(data) {
                          empRef.on("value",function(empData){
                            if (data.val()===null) {
                              /**If Attendance for given date having null so all engineer will make unmarked**/
                              var obj={};
                              obj[date]=JSON.stringify(Object.keys(empData.val()));
                            redisClient.hmset("employeeUnmarkedAttendance",obj);
                            if(i!==undefined){
                              resolve({"day":i,"absent":Object.keys(empData.val()).length});
                            }else {
                            resolve(Object.keys(empData.val()));
                            }

                          }else {
                            /**If Attendance for given date having data, so rest of engineer will make unmarked**/
                            var attendanceEmp=Object.keys(data.val());
                            var empData = Object.keys(empData.val());
                            attendanceEmp.forEach(function(engId){
                              empData=removeArrayData(empData,engId);
                            });
                            if(i!==undefined){
                            resolve({"day":i,"absent":empData.length});
                            }else {
                              resolve(empData);
                            }

                          }
                        });
                        });
                    } else {
                      if(i!==undefined){
                      resolve({"day":i,"absent":JSON.parse(employeeUnmarkedAttendance[date]).length});
                    }else {
                      resolve(JSON.parse(employeeUnmarkedAttendance[date]));
                    }

                    }
                  });
                  });
                };

                /****       creatEmployeeUnmarkedAttendance Method       *****/
                custEvent.prototype.creatEmployeeUnmarkedAttendance = function(engineerId, date) {
                    var obj = {};
                    redisClient.hgetall("employeeUnmarkedAttendance", function(error, employeeUnmarkedAttendance) {
                        if (employeeUnmarkedAttendance === null || employeeUnmarkedAttendance[date] === undefined) {
                            var ref = firebase.database().ref("employee");
                            ref.once("value", function(data) {
                                var obj = {};
                                obj[date] = JSON.stringify(removeArrayData(Object.keys(data.val()), engineerId));
                                redisClient.hmset("employeeUnmarkedAttendance", obj);
                            });
                        } else {
                            var unmarkedObj = removeArrayData(JSON.parse(employeeUnmarkedAttendance[date]), engineerId);
                            employeeUnmarkedAttendance[date] = JSON.stringify(unmarkedObj);
                            redisClient.hmset("employeeUnmarkedAttendance", employeeUnmarkedAttendance);
                        }
                    });
                };

                /****            updateEmployeeHRSnapshot Method              ****/
                custEvent.prototype.updateEmployeeHRSnapshot = function(engineerId, obj) {
                    redisClient.hgetall("employeeSnapshot", function(error, employeeData) {
                        var temp = JSON.parse(employeeData[engineerId]);
                        temp.employeeStatus = obj.employeeStatus;
                        temp.company = obj.company;
                        temp.blStartDate = obj.blStartDate;
                        temp.companyJoinDate = obj.companyJoinDate;
                        temp.companyLeaveDate = obj.companyLeaveDate;
                        var tempObj = {};
                        tempObj[engineerId] = JSON.stringify(temp);
                        redisClient.hmset("employeeSnapshot", tempObj);
                    });
                };

                /*****         updateEmployeePersonalSnapshot Method        *****/
                custEvent.prototype.updateEmployeePersonalSnapshot = function(engineerId, obj) {
                    redisClient.hgetall("employeeSnapshot", function(error, employeeData) {
                        var temp = JSON.parse(employeeData[engineerId]);
                        temp.employeeName = obj.employeeName;
                        temp.mobile = obj.mobile;
                        temp.emailId = obj.emailId;
                        var tempObj = {};
                        tempObj[engineerId] = JSON.stringify(temp);
                        redisClient.hmset("employeeSnapshot", tempObj);
                    });

                };

                function removeArrayData(array, element) {
                    var index = array.indexOf(element);
                    if (index >= 0) {
                        array.splice(index, 1); //deleting the attendance and making it marked
                        return array;
                    } else {
                        return array;
                    }
                }

                function readEmployeeSnapshot(callback) {
                    var ref = firebase.database().ref("employee");
                    ref.once("value", function(data) {
                        var temp = {};
                        var data = data.val();
                        for (var key in data) {
                            var tempObj = {};
                            tempObj.employeeName = data[key].personal.employeeName;
                            tempObj.employeeStatus = data[key].hrData.employeeStatus; //"Fellowship";//data[key].
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
