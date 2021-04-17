var express = require('express');
var router = express.Router();
const userModel=require('../models/user.model');


router.get('/log', function(req, res, next) {
    userModel.find(function(err,userListResponse){
      if(err)
      {
        res.send({status:500,message:'unable to find the users'})
      } 
      else{
        const recordCount=userListResponse.length
        res.send({status:200,recordCount:recordCount,results:userListResponse});
      }
    })
  });


  module.exports = router;