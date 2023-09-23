const express =require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {promisify}=require('util')
var router=express.Router()
var {getAllcarts,getCartByUserId,addNewCart,addNewProductsInCart,removeProductsInCart,clearCart} = require('../controllers/cart');

const Cart = require('../models/cart'); // Adjust the path based on your project structure
const loginAuth = require('../middlewares/auth');



router.get("/",loginAuth, async (req, res) => {

    try {
        var users = await getAllcarts()
        res.json({ data: users })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get user's cart
router.get('/:userId',loginAuth, async (req, res) => {
    var userId = req.params.userId
console.log(userId);
    try {
        var cart = await getCartByUserId(userId)

        if (cart) {
            res.status(200).json({ data: cart })
        }
        else {
            res.status(404).json({ message: `${userId} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${userId} not found` }) }

});

// create new cart for user
router.post('/:userId/newCart',loginAuth, async (req, res) => {
    var userId = req.params.userId
    var cart = req.body
    cart.user=userId
        try {
            var newcart = await addNewCart(cart)
            res.status(201).json({ data: newcart })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
});

// add new product in item in cart
router.post('/:userId/addProductInCart',loginAuth, async (req, res) => {
    var userId = req.params.userId
    var products = req.body.items
     try {
         var newproducts = await addNewProductsInCart(userId,products)
         res.status(201).json({ data: newproducts })
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 });
 ////////
// remove new product in item in cart
router.post('/:userId/removeProductsInCart/:productId', loginAuth,async (req, res) => {
    var userId = req.params.userId
    var productId = req.params.productId

     try {
         var newproducts = await removeProductsInCart(userId,productId)
         res.status(201).json({ data: newproducts })
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 });

 router.patch('/:userId/clear',loginAuth, async (req, res) => {
    var userId = req.params.userId
     try {
         var newcart = await clearCart(userId)
         res.status(201).json({ data: newcart })
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 });

module.exports = router;


module.exports = router 