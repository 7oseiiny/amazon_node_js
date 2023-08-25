const User_model = require('../models/user');

function addOrder(user){

    return User_model.create(user)
}

 
module.exports = {addOrder}