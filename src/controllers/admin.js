const adminModel=require('../models/admins');

function saveAdmin(admin){
    return adminModel.create(admin)
}

module.exports = {saveAdmin}