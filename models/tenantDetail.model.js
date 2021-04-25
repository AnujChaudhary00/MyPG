const mongoose=require('mongoose');


const tenantSchema=mongoose.Schema({

    pgbookedname:{
        type:String,
        required:true
    },
    pgid:
    {
        type:String,
        required:true,
    },
    ownerid:{
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true,
    },
    payment:
    {
        type:Number,
        required:true,
    },
    phone:
    {
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    }
});



const tenantModel=mongoose.model('tenant',tenantSchema);

module.exports=tenantModel;