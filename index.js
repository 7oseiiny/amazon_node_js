const express =require ('express');
const mongoose =require ('mongoose');
var middlewares =require ('./src/middlewares/middlewares');
var userRoutes =require('./src/routes/user');
var cartRoutes =require('./src/routes/cart');
const productRoutes=require('./src/routes/products');
const categoryRoutes=require('./src/routes/category');
const reviewRoutes=require('./src/routes/review');
const adminRoutes = require('./src/routes/admin');

const cors = require('cors');
const sellerRoutes = require('./src/routes/seller')

var app=express()

app.use(cors(
    {
        origin:'*'
    }
))
app.use(express.json())


app.use('/product',productRoutes);
app.use('/category',categoryRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/seller',sellerRoutes);
app.use('/review',reviewRoutes)
app.use('/admin', adminRoutes)
app.use('/seller',sellerRoutes);



app.use('*',function(req,res,next){
    res.send({message:"not found"})
    next();

})

app.use(function(err,req,res,next){
    res.send({message:err})
    next();

})




mongoose.connect("mongodb+srv://admin:itiAmazon@cluster0.ke6bvtv.mongodb.net/amazon").then(()=>{console.log("connect pass");})
app.listen(3300, _ => { console.log("ok"); })
