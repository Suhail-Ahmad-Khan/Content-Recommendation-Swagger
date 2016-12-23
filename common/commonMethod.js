var jwt = require('jwt-simple');
var moment = require('moment');
var firebase = require("../config/firebase.js");
var commonMethod={};
var config={};
config.TOKEN_SECRET =process.env.TOKEN_SECRET || 'nk235jaih535lhgdszhdfb-89ddsaj';

commonMethod.readEmployeeAttendance=function(engineerId,date){
  return new Promise(function(resolve,reject){
    var ref = firebase.database().ref("employeeAttendance/"+engineerId);
    ref.child(date).once("value",function(data){
      if(data.val()!== null){
        resolve(data.val());
      }else {
        reject();
      }
    });
  })
}

commonMethod.generateToken = function(user){
  var payload = {
  sub: user,
  iat: moment().unix(),
  exp: moment().add(14, 'days').unix()
};
return jwt.encode(payload, config.TOKEN_SECRET);
}

commonMethod.getFullTimeStamp=function(timestamp) {

  if (timestamp !== undefined) {
    timestamp=Number.parseInt(timestamp);
    now = new Date(timestamp);
  }else {
    now = new Date();
  }
    return (now.getFullYear() + "/" +
              (now.getMonth() + 1) + '/' +
            now.getDate());
}
commonMethod.getMonthTimeStamp=function(timestamp) {
  if (timestamp !== undefined) {
    timestamp=Number.parseInt(timestamp);
    now = new Date(timestamp);
  }else {
    now = new Date();
  }
    return (now.getFullYear() + "/" +
              (now.getMonth() + 1));
}

module.exports=commonMethod;
