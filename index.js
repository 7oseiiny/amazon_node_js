const express =require ('express');
const mongoose =require ('mongoose');
const dotenv = require("dotenv")
dotenv.config({ path: "config.env" })
const morgan = require('morgan');
/////////////////////////////////////////
var middlewares =require ('./src/middlewares/middlewares');
var userRoutes =require('./src/routes/user');
var cartRoutes =require('./src/routes/cart');
const productRoutes=require('./src/routes/products');
const categoryRoutes=require('./src/routes/category');
const reviewRoutes=require('./src/routes/review');
const adminRoutes = require('./src/routes/admin');
const orderRoutes = require('./src/routes/order');
const subcategoryRoutes=require('./src/routes/subcategory');

const cors = require('cors');
const sellerRoutes = require('./src/routes/seller')
const FavRoutes= require('./src/routes/favorite');
var app=express()

app.use(cors(
    {
        origin:'*'
    }
))

mongoose.connect(process.env.DB_URI).then((conn) => { console.log(`db connected to ${conn.connection.host}`); }).catch((err) => { console.error(err); process.exit(1) })

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}


app.use(express.json())




app.use('/product',productRoutes);
app.use('/category',categoryRoutes);

app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/seller',sellerRoutes);
app.use('/review',reviewRoutes)
app.use('/admin', adminRoutes)
app.use('/seller',sellerRoutes);
app.use('/favorite',FavRoutes);
app.use('/order',orderRoutes);
app.use('/subcategory',subcategoryRoutes);

app.use('*',function(req,res,next){
    res.send({message:"not found"})
    next();

})

app.use(function(err,req,res,next){
    res.send({message:err})
    next();

})




const port = process.env.PORT || 3000

app.listen(port, () => {console.log(`listen${port}`)})
