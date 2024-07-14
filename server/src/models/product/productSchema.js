const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true, 'Product name is required']
},
price: {
    type:Number,
    required:[true, 'Product price is required']
},
description: {
    type:String,
    required:[true, 'Product description is required']
},
category: {
    type:String,
    required:[true, 'Product category is required']
},
marketingLabel: {
    type:String,
    required:[true, 'Product marketing label is required']
},
productImages: {
    type:String,
    required:[true, 'Product images are required']

}
})

module.exports = mongoose.model('ProductSchema', ProductSchema)