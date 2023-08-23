const { saveProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/products');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let product = req.body;
        let newProduct = await saveProduct(product);
        res.status(201).json({ data: newProduct })
    } catch (err) {
        res.status(500).json({ message: err });
    }

})
router.get('/', async (req, res) => {
    try {
        let products = await getAllProducts();
        res.status(201).json({ data: products })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
router.patch('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let newData = req.body;
        let updateData = await updateProduct(id, newData);
        res.status(201).json({ data: updateData })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let deleteData = await deleteProduct(id);
        res.status(201).json({ data: deleteData })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
module.exports=router;