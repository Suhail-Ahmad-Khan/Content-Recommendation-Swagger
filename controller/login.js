var express = require('express');
var router = express.Router();
var firebase = require("../config/firebase.js");
var commonMethod = require("../common/commonMethod");

router.post("/",function(req,res){
  try {
    var email=req.body.emailId,password=req.body.password;
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
      res.status(401).send({token:null,status:401,message:"Unautherized User"});
    }).then(function(data){
      if (data!==undefined) {
          token=commonMethod.generateToken(email);
          res.setHeader("x-token",token);
      res.send({token,status:200,message:"login success"});
      }
    });
  } catch(e) {
    res.status(304).send("Bad Parameter");
  }
});

module.exports=router;
