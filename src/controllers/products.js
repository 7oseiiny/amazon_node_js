const productModel = require('../models/product');
const CategoryModel = require('../models/category ');


async function saveProduct(product) {
    try {
        let newProduct = productModel.create(product);
        let categoryId = product.categoryId;
        let category = await CategoryModel.findById(categoryId);
        if (category) {
            category.products.push((await newProduct)._id);
            await category.save();

        } else {
            console.log('Category not found');
        }
        return newProduct;
    } catch (err) {
        console.log(err);
    }
}
function getAllProducts() {
    return productModel.find().populate("categoryId")
}
function updateProduct(id, productData) {
    return productModel.findByIdAndUpdate(id, productData, { new: true })
}
async function deleteProduct(id) {
    try {
        let deletedProduct = await productModel.findById(id);
        let deletedProdCatId = deletedProduct.categoryId;
        let category = await CategoryModel.findById(deletedProdCatId).populate('products');
        let categoryProducts = category.products;

        let deletedItemIndex = categoryProducts.findIndex(item => {
            return item._id.toString() == id;
        });
        if (deletedItemIndex !== -1) {
            categoryProducts.splice(deletedItemIndex, 1);
            await category.save();
        }

        return productModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
}

function getproductByid(id) {

    return productModel.findOne({_id:id})
}

async function updatequantity(prodId ,new_q) {

    let q = await getproductByid(prodId)
    console.log(q.quantity);
    console.log(new_q);
    let newq= q.quantity- new_q
    return productModel.findOneAndUpdate({_id:prodId},{quantity:newq}, { new: true })
}

module.exports = { saveProduct, getAllProducts, updateProduct, deleteProduct,getproductByid,updatequantity }