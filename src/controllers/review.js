const ReviewModel=require('../models/review');


function saveReview(review){
    return ReviewModel.create(review);
}
function getAllReviews(){
    return ReviewModel.find()
}
function getReviewById(id){
    return ReviewModel.findOne({_id:id})
  }
function getUserReviewById(id){
    return ReviewModel.findOne({user:id})
}

function updateReview(id,reviewData){
    
    return ReviewModel.findByIdAndUpdate(id,reviewData,{new:true})
}
function deleteReview(id){
    return ReviewModel.findByIdAndDelete(id);
}

module.exports={saveReview,getAllReviews,getReviewById,getUserReviewById,updateReview,deleteReview}