const mongoose=require('mongoose');


const ticketSchema=mongoose.Schema({
        type:
        {
            type:String,
            required:true
        },
        pgid:
        {
            type:String
        },
        ownerid:
        {
            type:String,
            required:true
        },
        userid:{
            type:String
        },
        discription:{
            type:String,
            required:true
        },
        phonemail:
        {
            type:String,
            required:true
        },
        status:
        {
            type:String,
            required:true
        }
});



const ticketModel=mongoose.model('ticket',ticketSchema);

module.exports=ticketModel;