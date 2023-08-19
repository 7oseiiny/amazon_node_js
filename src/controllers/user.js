const User_model = require('../models/user');

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

 
module.exports = {saveNewUser,getAllUsers,deleteUser,getUserById,updateUser}