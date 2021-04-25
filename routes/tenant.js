var express=require('express');
var router=express.Router();
const tenantModel=require('../models/tenantDetail.model');

router.get('/listTenant/:ownerid', function(req, res, next) {
    tenantModel.find({'ownerid':req.params.ownerid},function(err,userListResponse){
      if(err)
      {
        res.send({status:500,message:'unable to find the users'})
      } 
      else{
        const recordCount=userListResponse.length
        res.send({status:200,count:recordCount,result:userListResponse});
      }
    })
  });


  
router.post('/bookPg',function(req,res,next){

    let pgbookedname= req.body.pgbookedname;
    let ownerid=req.body.ownerid;
    let pgid= req.body.pgid;
    let email= req.body.email;
    let phone= req.body.phone;
    let name=req.body.name;
    let payment=req.body.payment;
    let userid=req.body.userid;
  
    let tenantObj= new tenantModel(
      {
        userid:userid,
        pgid:pgid,
        pgbookedname:pgbookedname,
        email:email,
        phone:phone,
        name:name,
        payment:payment,
        ownerid:ownerid
      }
    );
    console.log(tenantObj)
  
    tenantObj.save(function(err,userObj){
      if(err){
        console.log(err);
       res.status(401).send(err);
      }
      else{ 
        console.log(userObj)
        res.status(200).send({userObj});
      }
    });
  
  });

  
router.put('/updateTenant/:id',verifyToken,function(req,res,next){

    const tenantId=req.params.id;
  
    let userid=tenantId;
    let pgbookedname= req.body.pgbookedname;
    let pgid= req.body.pgid;
    let email= req.body.email;
    let phone= req.body.phone;
    let name=req.body.name;
    let payment=req.body.payment;
  
    let tenatObj= 
      {
        'userid':userid,
        'pgbookedname':pgbookedname,
        'pgid':pgid,
        'email':email,
        'phone':phone,
        'name':name,
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


  
router.get('/mybookings/:id',function(req,res,next){
    const tenantId=req.params.id;
    tenantModel.find({'userid':tenantId},function(err,tenantResponse)
    {
      if(err)
      {
        console.log(err);
        res.send({status:500,message:"Cannot find the tenant"})
      }else{
        const recordCount=tenantResponse.length;
        res.send({status:200,result:tenantResponse,'count':recordCount});
      }
    })
  });

  router.delete('/cencelbooking',function(req,res,next){
    const tenantId=req.params.id;
    const pgid=req.params.pgid;
    tenantModel.findOneAndDelete({'userid':tenantId,'pgid':pgid},function(err,tenantResponse){
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