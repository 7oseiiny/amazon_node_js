const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema= mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            minlength:[2,'min length is 2']
            },
        lastName:{
            type:String,
            require:false,
            minlength:[2,'min length is 2']
        },
        userName:{
            type:String,
            require:false,
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
            minlength:[6,'min length is 6']

        },
        role:{
            type:String,
            default:"user",
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


var User_model = mongoose.model('user',userSchema)

module.exports=User_model