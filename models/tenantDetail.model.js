const mongoose=require('mongoose');


const tenantSchema=mongoose.Schema({

    pgBookedName:{
        type:String,
        required:true
    },
    pgOwnerName:
    {
        type:String,
        required:true,
    },
    homeCity:
    {
        type:String,
        required:true,
    },
    homestate:
    {
        type:String,
        required:true,
    },
    homeCountry:
    {
        type:String,
        required:true,
    },
    dob:
    {
        type:String,
        required:true,
    },
    name:
    {
        type:String,
        required:true,
    },
    gender:
    {
        type:String,
        required:true,
    },
    profession:
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
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});



const tenantModel=mongoose.model('tenant',tenantSchema);

module.exports=tenantModel;