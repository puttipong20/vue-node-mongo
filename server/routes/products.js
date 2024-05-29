const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");

router.post("/", async (req, res) => {
  try {
    let { p_name, p_detail, p_img, p_price, p_amout } = req.body;
    let newProduct = new productModel({
      p_name,
      p_detail,
      p_img,
      p_price,
      p_amout,
    });
    let product = await newProduct.save();
    return res.status(201).send({
      data: product,
      message: "Create product success.",
    });
  } catch (error) {
    return res.status(500).send({
      data: error.message,
      message: "Create prorduct fail.",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    return res.status(201).send({
      data: products,
      message: "Get product success.",
    });
  } catch (error) {
    return res.status(500).send({
      data: error.message,
      message: "Get prorduct fail.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await productModel.updateOne({ _id: id }, { $set: req.body });
    let product = await productModel.findById(id);
    return res.status(200).send({
        data: product,
        message: "Update product success.",
    });
} catch (error) {
    return res.status(500).send({
        data: error.message,
        message: "Update prorduct fail.",
    });
}
});
router.delete('/:id',async(req,res) => {
    try {
        let id = req.params.id;
        console.log(id)
        await productModel.deleteOne({_id:id})
        return res.status(204).send({
            message: "Delete product success.",
        });
        
    } catch (error) {
        
        return res.status(500).send({
            err: error.message,
            message: "Delete prorduct fail.",
        });
    }
})

module.exports = router;
