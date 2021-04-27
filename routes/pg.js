var express=require('express');
var router=express.Router();
const pg=require('../models/pglist.model');
var jwt= require('jsonwebtoken');
const pgModel = require('../models/pglist.model');
const path=require('path');
const multer =require('multer');



router.get('/listPg',function(req,res,next){
    pg.find(function(err,userListResponse){
        if(err)
        {
          res.send({status:500,message:'records doesn;t exsits'});
        } 
        else{
          const recordCount=userListResponse.length
          res.send({status:200,recordCount:recordCount,result:userListResponse});
        }
      })
});

const storage=multer.diskStorage({
  destination:function(req,res,cb){
    cb(null,"images");
  },
  filename:function(req,file,cb){
    cb(null,`${Date.now()}_${file.originalname}`);
  }
});

const upload=multer({
  storage:storage
})

router.post('/addPg',upload.array("uploads[]", 12),function(req,res,next){

    let ownerid=req.body.id;
    let pgname= req.body.pgname;
    let ownername= req.body.ownername;
    let bed= req.body.bed;
    let city= req.body.city;
    let pincode= req.body.pincode;
    let state= req.body.state;
    let discription= req.body.discription;
    let type=req.body.type;
    let rent=req.body.rent;
    let email=req.body.email;
    let contactno =req.body.contactno; 
    let totalroom=req.body.totalroom; 

    const files = req.files;
    let index, len;
    let photos=[]

    for (index = 0, len = files.length; index < len; ++index) {
       photos.push(req.protocol+"://"+req.get("host")+"/images/"+files[index].filename);
  }
    photos.forEach(res=>{console.log(res)});
    let pgObj= new pg(
      {
        pgname:pgname,
        ownername:ownername,
        bed:bed,
        city:city,
        pincode:pincode,
        state:state,
        discription:discription,
        type:type,
        rent:rent,
        contactno:contactno,
        email:email.toLowerCase(),
        totalroom:totalroom,
        ownerid:ownerid,
        photos:photos
      }
    );
    console.log(pgObj);
    pgObj.save(function(err,pgObj){
      if(err){
        console.log(err);
       res.status(403).send(err);
      }
      else{
        res.status(200).send({status:200,message:"added Successfully"});
      }
    });
  });
  


  router.delete('/deletePg/:id',function(req,res,next){
    const ownerid=req.params.id;
    pgModel.findByIdAndDelete(ownerid,function(err,userListResponse){
      if(err)
      {
        console.log(err);
        res.send({status:500,message:'unable to find the PG'})
      } 
      else{
        res.send({status:200,message:"PG deleted"});
      }
    });
  });


  router.put('/updatePg/:id',verifyToken,function(req,res,next){

    const pgId=req.params.id;
  
    
    let pgname= req.body.pgName;
    let ownername= req.body.ownerName;
    let bed= req.body.bed;
    let city= req.body.city;
    let pincode= req.body.pincode;
    let state= req.body.state;
    let discription= req.body.discription;
    let type=req.body.type;
    let rent=req.body.rent;
    let email=req.body.email;
    let contactno =req.body.contactno;
    let totalroom=req.body.totalroom;
    let ownerid=req.body.ownerid;

    let pgObj= 
      {
        'pgname':pgname,
        'ownername':ownername,
        'ownerid':ownerid,
        'bed:':bed,
        'city':city,
        'pincode':pincode,
        'state':state,
        'discription':discription,
        'type':type,
        'rent':rent,
        'contactno':contactno,
        'email':email.toLowerCase(),
        'totalroom,':totalroom
      };
    pgModel.findByIdAndUpdate(pgId,pgObj,{new: true},function(err,userListResponse){
      if(err)
      {
        res.send({status:500,message:'unable to find the users'})
      } 
      else{
        res.send({status:200,results:userListResponse});
      }
    });
  });

  router.get('/searchLocation/:loc',function(req,res,next){

    const location=req.params.loc;
    pgModel.find({'city':location},function(err,pgResponse){
      if(err)
    {
      res.send({status:500,message:"internal server"});
    }
    else{
      const recordCount=pgResponse.length
      res.send({status:200,'count':recordCount,result:pgResponse}); 
    }
    }) 
    
  })

  router.get('/searchPg/:id',function(req,res,next){
    const ownerid=req.params.id;
    pgModel.find({'ownerid':ownerid},function(err,pgResponse)
    {
      if(err)
      {
        console.log(err);
        res.send({status:500,message:"Cannot find Pg"})
      }else{

        const recordCount=pgResponse.length
        res.send({status:200,'count':recordCount,result:pgResponse}); 
      }
    })
  });


  
  router.get('/pgDetail/:id',function(req,res,next){
    const id=req.params.id;
    pgModel.findById(id,function(err,pgResponse)
    {
      if(err)
      {
        console.log(err);
        res.send({status:500,message:"Cannot find the user"})
      }else{
        res.send({status:200,result:pgResponse});
      }
    })
  });



  


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



module.exports=router;