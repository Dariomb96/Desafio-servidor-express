const mongoose = require ('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productCollection = "products";
const productSchema = mongoose.Schema({
    title:String,
    artist:String,
    price:Number,
    thumbnail:String,
    code:String,
    stock:String,
    category:String,
    status:Boolean,
})

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(productCollection,productSchema);
module.exports = {
    productsModel,
}