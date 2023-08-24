const ReviewModel=require('../models/review');


function saveReview(review){
    return ReviewModel.create(review);
}
function getAllReviews(){
    return ReviewModel.find()
}
function getReviewById(id){
    return todosModel.findOne({_id:id})
  }
function getUserReviewById(id){
    return ReviewModel.findOne({userId:id}).populate('products')
}

function updateReview(id,reviewData){
    
    return ReviewModel.findByIdAndUpdate(id,reviewData,{new:true})
}
function deleteReview(id){
    return ReviewModel.findByIdAndDelete(id);
}

module.exports={saveReview,getAllReviews,getReviewById,getUserReviewById,updateReview,deleteReview}