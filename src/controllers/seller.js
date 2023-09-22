const sellerModel = require("../models/seller")

function saveNewSeller(seller){

    return sellerModel.create(seller)
}

function getAllUSellers (){
    return sellerModel.find()
}


function deleteSeller(id){
    return sellerModel.findByIdAndDelete(id,{new:true})
}

function getSellerById(id){
    return sellerModel.findOne({_id:id})
}
function updateSeller(id , seller){
    return sellerModel.findByIdAndUpdate(id,seller,{new:true})
 }
 function updatestatus(id , status){
    return sellerModel.findByIdAndUpdate({_id:id},{status:status},{new:true})
 }
 function updatecategory(id , category){
    return sellerModel.findByIdAndUpdate({_id:id},{category:category},{new:true})
 }

 async function report(sellerId , userId){

    seller =await getSellerById(sellerId)
    if (seller.usersReport.includes(userId)) {
        return "Already reported";
    }
    else{
        num = seller.numOfReports + 1
        if (num>1) {
            if (seller.status!="blocked") {
                await updatestatus(sellerId ,"warning")
            }
        }
        newUsersReport=[... seller.usersReport ,userId]
        return sellerModel.findByIdAndUpdate({_id:sellerId},{numOfReports:num,usersReport:newUsersReport},{new:true})
    }
 }

 module.exports = {saveNewSeller,getAllUSellers,deleteSeller,getSellerById,updateSeller,updatestatus,report,updatecategory}
