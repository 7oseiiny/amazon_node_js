const CategoryModel=require('../models/category ')
function saveCategory(Category) {
  return CategoryModel.create(Category);
}
function getAllCategories() {
  return CategoryModel.find();
}
function getCategory(id) {
  return CategoryModel.findById(id).populate("products");
}
function updateCategory(id, CategoryData) {
  return CategoryModel.findByIdAndUpdate(id, CategoryData, { new: true });
}
function deleteCategory(id) {
  return CategoryModel.findByIdAndDelete(id);
}

module.exports = {
  saveCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};