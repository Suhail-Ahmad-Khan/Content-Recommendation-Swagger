var jwt = require('jwt-simple');
var moment = require('moment');
var firebase = require("../config/firebase.js");
var commonMethod = {};
var config = {};
config.TOKEN_SECRET = process.env.TOKEN_SECRET || 'nk235jaih535lhgdszhdfb-89ddsaj';

/**       Mehtod is for reading employee HR data        **/
commonMethod.updateEmployeeData = function(engineerId, field, obj) {
    return new Promise(function(resolve, reject) {
      if (engineerId===undefined) {
        reject(404);
      }
        var ref = firebase.database().ref("employee/" + engineerId);
        ref.once("value",function(value){
          if(value.val()!== null){
            ref.child(field).update(obj).then(function() {
                resolve();
            }).catch(function(e) {
                reject();
            });
          }else {
            reject(404);
          }

      });

    });
};

commonMethod.readEmployeeByFieldData = function(engineerId, field) {
    return new Promise(function(resolve, reject) {
        var ref = firebase.database().ref("employee/" + engineerId);
        ref.child(field).once("value").then(function(data) {
            if (data.val() !== null) {
                resolve(data.val());
            } else {
                reject();
            }
        });
    });
};

/**       Mehtod is for inserting employee Attendance Data in firebase          **/
commonMethod.createEmployeeAttendance = function(engineerId, date, obj) {
    return new Promise(function(resolve, reject) {
        var ref = firebase.database().ref("employeeAttendance/" + engineerId);
        ref.child(date).set(obj);
        ref.once("value", function(data) {
            resolve("Data");
        });
    });
};

commonMethod.readEmployeeAttendance = function(engineerId, date) {
    return new Promise(function(resolve, reject) {
        var ref = firebase.database().ref("employeeAttendance/" + engineerId);
        ref.child(date).once("value", function(data) {
            if (data.val() !== null) {
                resolve(data.val());
            } else {
                reject();
            }
        });
    })
};

commonMethod.generateToken = function(user) {
    var payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};
commonMethod.verifyToken = function(token){
  try {
  jwt.decode(token, config.TOKEN_SECRET);
  } catch (e) {
    throw 404;
   }

}

commonMethod.getFullTimeStamp = function(timestamp) {

    if (timestamp !== undefined) {
        timestamp = Number.parseInt(timestamp);
        now = new Date(timestamp);
    } else {
        now = new Date();
    }
    return (now.getFullYear() + "/" +
        (now.getMonth() + 1) + '/' +
        now.getDate());
}
commonMethod.getMonthTimeStamp = function(timestamp) {
    if (timestamp !== undefined) {
        timestamp = Number.parseInt(timestamp);
        now = new Date(timestamp);
    } else {
        now = new Date();
    }
    return (now.getFullYear() + "/" +
        (now.getMonth() + 1));
}

commonMethod.isSunday = function(year,month ,day){
  var myDate = new Date(year+"/"+month+"/"+day);
if(myDate.getDay() === 0)
return true;
else
return false;
}
commonMethod.monthDays = function(time) {
    var date = new Date(Number.parseInt(time));
    var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
}

module.exports = commonMethod;
