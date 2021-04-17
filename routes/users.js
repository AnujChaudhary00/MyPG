var express = require('express');
var router = express.Router();
var jwt= require('jsonwebtoken');
const path=require('path');
const multer =require('multer');

var bcrypt=require('bcrypt');

var mongoose=require('mongoose');
const { create } = require('../models/user.model');
  const userModel=require('../models/user.model');

/* GET users listing. */
router.get('/list', function(req, res, next) {
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

const maxAge=24*60*60;
const createToken=(id)=>{
  return jwt.sign({id},'secretpass',{
    expiresIn:maxAge
  })
}



router.post('/login',function (req,res,next){
  let auth;
  userModel.findOne({email:req.body.email}).then(function(user){
      if(!user)
      {
        res.send({status:404,message:'Email incorrect'});
      }else{
        let reqPass=req.body.password;
        let userPass=user.password;
          if(bcrypt.compareSync(reqPass,userPass)) {
            console.log("logged in");
            const token=createToken(user._id);
            res.status(200).send({'id':user._id,'role':user.role,'token':token});
          }
          else{
            console.log('Comparison error: ', err);
            res.send({status:401,message:'Incorrect Password'});
          }
      }
  }).catch(err=>{console.log(err);
          res.send({status:500,message:"unknown error"})
  })
});


const storage=multer.diskStorage({
  destination:function(req,res,cb){
    cb(null,"images");
  },
  filename:function(req,file,cb){
    console.log(file);
    cb(null,`${Date.now()}_${file.originalname}`);
  }
});

const upload=multer({
  storage:storage
})


router.post('/signup',upload.single("profilepic"),function(req,res,next){

  let firstname= req.body.firstName;
  let lastname= req.body.lastName;
  let email= req.body.email;
  let phone= req.body.phone;
  let dob= req.body.dob;
  let pass= req.body.password;
  let role= req.body.role;
  let gender=req.body.gender;
  let profilepic
  let url=req.protocol+"://"+req.get("host");
  if(req.file!=null)
  {
    console.log(req.file);
  }else{
    console.log("error in getting image")
  }

  let userObj= new userModel(
    {
      firstname:firstname,
      lastname:lastname,
      email:email,
      phone:phone,
      password:pass,
      role:role,
      dob:dob,
      gender:gender,
      profilepic:url+"/images/"+req.file.filename
    }
  );
  console.log(userObj);

  userObj.save(function(err,userObj){
    if(err){
      console.log(err);
     res.status(401).send(err);
    }
    else{
      const token=createToken(userObj._id);
      res.status(200).send({'id':userObj._id,'token':token,'role':userObj.role});
    }
  });

});


router.delete('/delete/:id',function(req,res,next){
  const userId=req.params.id;
  userModel.findByIdAndDelete(userId,function(err,userListResponse){
    if(err)
    {
      console.log(err);
      res.send({status:500,message:'unable to find the users'})
    } 
    else{
      res.send({status:200,message:"User deleted"});
    }
  });
})

router.put('/update/:id',verifyToken,function(req,res,next){

  const userId=req.params.id;


  let firstname= req.body.firstName;
  let lastname= req.body.lastName;
  let email= req.body.email;
  let phone= req.body.phone;
  let dob= req.body.dob;
  let password= req.body.password;
  let role= req.body.role;
  let gender=req.body.gender;

  let userObj= 
    {
      'firstname':firstname,
      'lastname':lastname,
      'email':email,
      'phone':phone,
      'password':password,
      'role':role,
      'dob':dob,
      'gender':gender 
    };
  userModel.findByIdAndUpdate(userId,userObj,{new: true},function(err,userListResponse){
    if(err)
    {
      res.send({status:500,message:'unable to find the users'})
    } 
    else{
      console.log(userListResponse);
      res.send({status:200,results:userListResponse});
    }
  });
})

router.get('/search/:id',verifyToken,function(req,res,next){
  const userId=req.params.id;
  userModel.findById(userId,function(err,userResponse)
  {
    if(err)
    {
      console.log(err);
      res.send({status:500,message:"Cannot find the user"})
    }else{
      const recordCount=userResponse.length;
      res.send({status:200,recordCount:recordCount,results:userResponse});
    }
  })
})



function verifyToken(req,res,next)
{
  if(!req.headers.authorization)
  {
      return res.status(401).send('Unathorized Request');
  }
  let token= req.headers.authorization.split(' ')[1];
  if(token=='null')
  { 
      return res.status(401).send('Unathorized Request ');   
  }
  
     let payload =jwt.verify(token,'secretpass');

     if(!payload)
     {
         return res.status(401).send("Unathorized request ");
     }
     req.userId=payload.subject;
    
     next();
  }

module.exports = router;
