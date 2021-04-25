const mongoose=require('mongoose');


const pgSchema=mongoose.Schema({
        pgname:
        {
            type:String,
            required:true
        },
        ownername:
        {
            type:String,
            required:true
        },
        bed:
        {
            type:Number,
            required:true
        },
        city:
        {
            type:String,
            required:true
        },
        pincode:
        {
            type:String,
            required:true
        },
        state:
        {
            type:String,
            required:true
        },
        discription:
        {
            type:String
        },
        type:
        {
            type:String,
            required:true
        },
        rent:
        {
            type:Number,
            required:true
        },
        contactno:{
            type:Number,
            required:true
        },
        email:{
            type:String
        },
        totalroom:{
            type:Number,
            required:true
        },
        ownerid:{
            type:String,
            required:true,
        },
        photos:{
            type:[]
        }
});



const pgModel=mongoose.model('pglist',pgSchema);

module.exports=pgModel;