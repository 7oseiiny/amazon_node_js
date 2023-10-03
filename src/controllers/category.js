const CategoryModel = require("../models/category ");
const productModel = require("../models/product");
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
async function catLessThanPrice(price, catId) {
  try {
    const result = await productModel.find({
      categoryId: catId,
      "price.new": { $lt: price },
    });
    return result;
  } catch (err) {
    console.error("Error ", err);
    return null;
  }
}
async function catGreaterThanPrice(price, catId) {
  try {
    const result = await productModel.find({
      categoryId: catId,
      "price.new": { $gt: price },
    });
    return result;
  } catch (err) {
    console.error("Error ", err);
    return null;
  }
}
// async function getCategoryByName(name) {
//   try {
//     return CategoryModel.findOne({name_en:name}).populate("products");
//   }
//   catch (err) {
//     return err;
//   }
// }

async function getCategoryByName(name, pageNumber, productsPerPage) {
  try {
    const list = await CategoryModel.findOne({ name_en: name })
      .populate({
        path: "products",
        options: {
          skip: (pageNumber - 1) * productsPerPage,
          limit: productsPerPage,
        },
      })
      .exec();

    return list;
  } catch (err) {
    throw err;
  }
}


module.exports = {
  saveCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  catLessThanPrice,
  catGreaterThanPrice,
  getCategoryByName,
};
