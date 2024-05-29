const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
require("dotenv").config;

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPass =await bcrypt.hash(password, 10);
    let user = new userModel({
      email,
      password: hashPass,
      role: "user"
    });
    let response = await user.save();
    return res.status(201).send({
      message: "Crerate User success.",
      data: response,
    });
} catch (error) {
    return res.status(500).send({
        message: error.message,
    });
}
});
router.post('/login',async(req,res) => {
    try {
        let isLogin = false
        let token = ''
        let userPass = ''
        const {email,password} = req.body
        let user =await userModel.findOne({email})
        if(!user) {
            userPass = user.password
        }
        isLogin = bcrypt.compare(password,userPass)
        if(isLogin){
            token = jwt.sign({email:user.email},process.env.JWT_SECRET)
        }
        
        return res.status(201).send({
          message: "Log in success.",
          role: user.role,
        });
        
    } catch (error) {
        return res.status(500).send({
          message: "Email or password invalid",
        });
    }
})

router.get("/users", async (req, res) => {
  try {
    let users = await userModel.find();
    return res.status(200).send({
      message: "Get users success.",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
