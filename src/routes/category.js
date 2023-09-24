const {saveCategory,getAllCategories,getCategory,updateCategory,deleteCategory,addProductsToCategory} = require('../controllers/category');
const express = require('express');
const adminAuth = require('../middlewares/admin_auth');
const sellerAuth = require('../middlewares/seller_auth');
const adminOrSellerAuth = require('../middlewares/admin_or_seller_auth');
const loginAuth = require('../middlewares/auth');

const router = express.Router();

router.post('/',loginAuth,adminOrSellerAuth,async (req, res) => {
    try {
        let Category = req.body;
        let newCategory = await saveCategory(Category);
        res.status(201).json({ data: newCategory })
    } catch (err) {
        res.status(500).json({ message: err });
    }

})

router.get('/', async (req, res) => {
    try {
        let Categories = await getAllCategories();
        res.status(201).json({ data: Categories })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
router.get('/:id', async (req, res) => {
    try {
        let {id}=req.params;
        let Category = await getCategory(id);
        res.status(201).json({ data: Category })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
router.patch('/:id' ,async (req, res) => {
    try {
        let { id } = req.params;
        let newData = req.body;
     
        let updateData = await updateCategory(id, newData);
        res.status(201).json({ data: updateData })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
router.delete('/:id',async (req, res) => {
    try {
        let { id } = req.params;
        let deleteData = await deleteCategory(id);
        res.status(201).json({ data: deleteData })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
module.exports=router;