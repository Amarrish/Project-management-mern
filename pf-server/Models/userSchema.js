const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username required']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:[true, 'password required']
    },
    image:{
        type:String,
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String,
    }
})

const users = mongoose.model('users',userSchema)

module.exports = users