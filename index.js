const express =require ('express')
const mongoose =require ('mongoose')
const middlewares =require ('./src/middlewares/middlewares')

var app=express()

middlewares.origin("*")
middlewares.express_json()





