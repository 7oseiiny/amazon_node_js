const productModel = require('../models/product');
const ReviewModel=require('../models/review');
const { getproductByid } = require('./products');


async function saveReview(userId, productId, rating,comment){
   

    return ReviewModel.create({user:userId,product:productId,rating:rating,comment:comment})
}
function getAllReviews(){
    return ReviewModel.find().populate("product").populate("user")
}
function getReviewById(id){
    return ReviewModel.findOne({_id:id})
  }
function getUserReviewById(id){
    return ReviewModel.findOne({user:id}).populate("product").populate("user")
}

function updateReview(id,reviewData){
    
    return ReviewModel.findByIdAndUpdate(id,reviewData,{new:true})
}
function deleteReview(id){
    return ReviewModel.findByIdAndDelete(id);
}

module.exports={saveReview,getAllReviews,getReviewById,getUserReviewById,updateReview,deleteReview}