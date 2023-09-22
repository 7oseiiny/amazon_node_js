const sellerModel = require('../models/seller');
const User_model = require('../models/user');
const { getSellerById, updatestatus } = require('./seller');

function saveNewUser(user){

    return User_model.create(user)
}

function getAllUsers (){
    return User_model.find()
}


function deleteUser(id){
    return User_model.findByIdAndDelete(id,{new:true})
}

function getUserById(id){
    return User_model.findOne({_id:id})
}
function updateUser(id , user){
    return User_model.findByIdAndUpdate(id,user,{new:true})
 }

 async function report(sellerId , userId){

    seller =await getSellerById(sellerId)

    if (seller.usersReport.includes(userId)) {
        return "Already reported";
    }
    else{
        if (seller.usersReport.length+1>1) {
            if (seller.status!="blocked") {

                await updatestatus(sellerId ,"warning")
            }
        }
        newUsersReport=[... seller.usersReport ,userId]
        return sellerModel.findByIdAndUpdate({_id:sellerId},{usersReport:newUsersReport},{new:true})
    }
 }
 
module.exports = {saveNewUser,getAllUsers,deleteUser,getUserById,updateUser,report}