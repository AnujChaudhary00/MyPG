URLSearchParams.addUser(newUser,(err,user)=>{
    if(err)
    {
        resizeBy.json({success:false,msg:''});
    }else{

    }
});


module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password=hash;
            newUser.save(callback);
        })
    })
}
app.use(passport.initil)