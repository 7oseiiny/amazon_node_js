// const SubcategoryModel=require('../models/subcategory ');
const SubcategoryModel = require('../models/subcategory');
// const CategoryModel=require('../models/category ');


function savesubCategory(SubCategory){
    return SubcategoryModel.create(SubCategory);
}
function getAllSubCategories(){
    return SubcategoryModel.find()
}
function getSubCategory(id){
    return SubcategoryModel.findById(id).populate('Category')
}
function updateSubCategory(id,subCategoryData){
    
    return SubcategoryModel.findByIdAndUpdate(id,subCategoryData,{new:true})
}
function deleteSubCategory(id){
    return SubcategoryModel.findByIdAndDelete(id);
}
module.exports= {savesubCategory,getAllSubCategories,getSubCategory,updateSubCategory,deleteSubCategory}

