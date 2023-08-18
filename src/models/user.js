const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema=new mongoose.Schema(
    {
        fristName:{
            type:String,
            require:true,
            minlength:[2,'min length is 2']
        },
        lastName:{
            type:String,
            require:true,
            minlength:[2,'min length is 2']
        },
        userName:{
            type:String,
            require:true,
            unique:true,
            minlength:[5,'min length is 5'],
            
        },
        email:{
            type:String,
            required:true,
            unique:true,
            minlength:[8,'min length is 8']

        },
        password:{
            type:String,
            require:true,
            minlength:[10,'min length is 10']

        },
        role:{
            type:String,
            default:"user",
            enum: ["user", "admin","seller"],
        },
        address:{
            type:String
        }
    }
)

userSchema.pre("save",async function(next){
        var salt =await bcrypt.genSalt(10)
        var hashedpass=await bcrypt.hash(this.password,salt)
        this.password=hashedpass
        next()
    }
)


const User_model = mongoose.model('User',userSchema)

module.exports=User_model