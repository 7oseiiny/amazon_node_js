const mongoose = require('mongoose');
var sellerSchema= mongoose.Schema(
    {
        fristName:{
            type:String,
            minlength:[2,'min length is 2']
            },
        lastName:{
            type:String,
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
            minlength:[4,'min length is 4']

        },
      
       
    }
)


sellerSchema.pre("save",async function(next){
    var salt =await bcrypt.genSalt(10)
    var hashedpass=await bcrypt.hash(this.password,salt)
    this.password=hashedpass
    next()
})

var sellerModel = mongoose.model('seller',sellerSchema)

module.exports=sellerModel