const express =require ('express')
const cors =require ('cors')
var app=express()


function origin(o){
    app.use(
        cors({
            origin: o
        })
    )
}
function express_json(){
    app.use(express.json())

}



module.exports={origin,express_json}