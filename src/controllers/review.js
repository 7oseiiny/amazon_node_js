const ReviewModel=require('../models/review');


function saveReview(userId, productId, rating,comment){
    return ReviewModel.create({user:userId,product:productId,rating:rating,comment:comment})
}
function getAllReviews(){
    return ReviewModel.find().populate("product").populate("user")
}
function getReviewById(id){
    return ReviewModel.findOne({_id:id})
    .populate("product",["title_en","title_ar","img","comment","rating"])
    .populate("user",["userName","lastName","email","address"])

  }
function getUserReviewById(id){
    return ReviewModel.findOne({user:id})
    .populate("product",["title_en","title_ar","img","comment","rating"])
    .populate("user",["userName","lastName","email","address"])
}
function getProductReviewById(id){
    return ReviewModel.findOne({product:id})
    .populate("product",["title_en","title_ar","img","comment","rating"])
    .populate("user",["userName","lastName","email","address"])
}

function updateReview(id,reviewData){
    
    return ReviewModel.findByIdAndUpdate(id,reviewData,{new:true})
}
function deleteReview(id){
    return ReviewModel.findByIdAndDelete(id);
}

module.exports={saveReview,getAllReviews,getReviewById,getUserReviewById,updateReview,deleteReview,getProductReviewById}