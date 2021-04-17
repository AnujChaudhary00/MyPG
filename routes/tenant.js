var express=require('express');
var router=express.Router();
const tenantModel=require('../models/tenantDetail.model');


router.get('/listTenant',verifyToken, function(req, res, next) {
    tenantModel.find(function(err,userListResponse){
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


  
router.post('/bookPg',verifyToken,function(req,res,next){

    let pgBookedName= req.body.pgBookedName;
    let pgOwnerName= req.body.pgOwnerName;
    let email= req.body.email;
    let phone= req.body.phone;
    let homeCity= req.body.homeCity;
    let homestate= req.body.homestate;
    let homeCountry= req.body.homeCountry;
    let name=req.body.name;
    let gender=req.body.gender;
    let profession=req.body.profession;
    let payment=req.body.payment;
  
  
    let tenantObj= new tenantModel(
      {
        pgBookedName:pgBookedName,
        pgOwnerName:pgOwnerName,
        email:email,
        phone:phone,
        homeCity:homeCity,
        homestate:homestate,
        homeCountry:homeCountry,
        dob:dob,
        name:name,
        gender:gender,
        profession:profession,
        payment:payment
      }
    );
  
    tenantObj.save(function(err,userObj){
      if(err){
        console.log(err);
       res.status(401).send(err);
      }
      else{
        res.status(200).send("success");
      }
    });
  
  });

  
router.put('/updateTenant/:id',verifyToken,function(req,res,next){

    const tenantId=req.params.id;
  
  
    let pgBookedName= req.body.pgBookedName;
    let pgOwnerName= req.body.pgOwnerName;
    let email= req.body.email;
    let phone= req.body.phone;
    let homeCity= req.body.homeCity;
    let homestate= req.body.homestate;
    let homeCountry= req.body.homeCountry;
    let name=req.body.name;
    let gender=req.body.gender;
    let profession=req.body.profession;
    let payment=req.body.payment;
  
    let tenatObj= 
      {
        'pgBookedName':pgBookedName,
        'pgOwnerName':pgOwnerName,
        'email':email,
        'phone':phone,
        'homeCity':homeCity,
        'homestate':homestate,
        'homeCountry':homeCountry,
        'dob':dob,
        'name':name,
        'gender':gender,
        'profession':profession,
        'payment':payment
      };
      tenantModel.findByIdAndUpdate(tenantId,tenatObj,{new: true},function(err,tenantRes){
      if(err)
      {
        res.send({status:500,message:'unable to find the users'})
      } 
      else{
        res.send({status:200,results:"Success"});
      }
    });
  });


  
router.get('/searchTenant/:id',verifyToken,function(req,res,next){
    const tenantId=req.params.id;
    tenantModel.findById(tenantId,function(err,tenantResponse)
    {
      if(err)
      {
        console.log(err);
        res.send({status:500,message:"Cannot find the user"})
      }else{
        res.send({status:200,result:tenantResponse});
      }
    })
  });

  router.delete('/deleteTenant/:id',verifyToken,function(req,res,next){
    const tenantId=req.params.id;
    tenantModel.findByIdAndDelete(tenantId,function(err,tenantResponse){
      if(err)
      {
        console.log(err);
        res.send({status:404,message:'unable to find and delete the PG'})
      } 
      else{
        res.send({status:200,message:"tenant deleted"});
      }
    });
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
      
       next();
    }
  

module.exports=router;