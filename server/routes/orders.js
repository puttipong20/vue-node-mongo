const express = require("express");
const orderModel = require("../models/orderModel");
const router = express.Router();

router.post("/", async(req, res) => {
  try {
    let { o_name, o_payment_method, o_total, o_createAt, o_list } = req.body;
    let newOrder = new orderModel({
      o_name,
      o_payment_method,
      o_total,
      o_createAt,
      o_list,
    });
    let order = await newOrder.save()
    return res.status(201).send({
      message: "Create order success.",
      data: order,
    });
} catch (error) {
    return res.status(500).send({
        err: error.message,
        message: "Create order fail.",
    });
}
});

router.get('/',async(req,res) => {
    try {
        let order = await orderModel.find()
        return res.status(200).send({
          message: "Get order success.",
          data: order,
        });
        
    } catch (error) {
        
        return res.status(500).send({
          err: error.message,
          message: "Get order fail.",
        });
    }
})
router.get('/:id',async(req,res) => {
    try {
        let id = req.params.id
        let order = await orderModel.findById({_id: id})
        return res.status(200).send({
          message: "Get order success.",
          data: order,
        });
        
    } catch (error) {
        
        return res.status(500).send({
          err: error.message,
          message: "Get order fail.",
        });
    }
})
router.delete('/:id',async(req,res) => {
    try {
        let id = req.params.id
        console.log(id)
        await orderModel.deleteOne({_id:id})
        return res.status(204).send({
          message: "Delete order success.",
        });
        
    } catch (error) {
        return res.status(500).send({
          err: error.message,
          message: "Delete order fail.",
        });
    }
    
})

module.exports = router;
