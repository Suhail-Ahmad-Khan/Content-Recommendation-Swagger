var express = require('express');
var router = express.Router();
var firebase = require("../config/firebase.js");
var commonMethod = require("../common/commonMethod");


router.post("/",function(req,res){
  var email = req.body.emailId;
  try {
    var ref = firebase.database().ref("employee");
    var postsRef = ref.orderByChild("personal/email");
      postsRef.equalTo(email).on("value", function (data) {
        if(data.val()!==null){
          var token =commonMethod.generateToken(email);
          res.setHeader("x-token", token);
          res.send({emailId:email,token});
        }else {
          res.status(404).send("Email not found");
        }
      })
  } catch (e) {
    res.status(304).send("Bad Parameter");
  }

})
module.exports=router;
