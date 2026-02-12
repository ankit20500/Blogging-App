const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required'],
        min:[3, 'name should be greater than 3'],
        max:[10, 'name should be not greater than 10']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:[true, 'email is already exist'],
        min:[13, 'email should be greater than 13'],
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        min:[6, 'password should be greater than 6 words'],
        max:[15, 'password should be not greater than 15']
    },
    phone:{
        type:Number,
        required:[true, 'number is required'],
        length:[10, 'number should be 10 digits']
    },
    avtar:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model('user',userSchema);

module.exports={User};