const mongoose = require("mongoose")
const product = new mongoose.Schema({
    p_name: {type:String},
    p_detail: {type:String},
    p_img: {type:String},
    p_price: {type:Number},
    p_amout: {type:Number},
})

module.exports = mongoose.model('products',product)