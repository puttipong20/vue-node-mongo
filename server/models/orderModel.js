const mongoose = require('mongoose')
const listOrder = {
    l_name:{type:String},
    l_detail:{type:String},
    l_img:{type:String},
    l_price:{type:Number},
    l_amount:{type:Number},
}

const order = new mongoose.Schema({
    o_name: {type:String},
    o_payment_method: {type:String},
    o_total: {type:Number},
    o_createAt:{type:String},
    o_list:[listOrder]
})

module.exports = mongoose.model('orders',order)