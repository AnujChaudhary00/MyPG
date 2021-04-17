const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
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
    },
    role:
    {
        type:String,
        required:true
    },
    gender:
    {
        type:String
    },
    profilepic:{
        type:String
    }
});


userSchema.pre('save',async function(next){
    this.password= bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
})



const userModel=mongoose.model('user',userSchema);

module.exports=userModel;