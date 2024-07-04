const mongoose=require('mongoose')


//creating user schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        unique:true,
        required:true,
        minlength:6,
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema)
module.exports=User