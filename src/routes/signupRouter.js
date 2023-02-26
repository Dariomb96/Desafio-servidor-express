const { userModel } = require('../models/users');
const express = require('express');
const signupRouter = express.Router();



signupRouter.get("/", (req, res) => {
  res.render("signup", { title: "Signup", styles: "css/signup.css" });
});

signupRouter.post("/", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  try {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      password,
      age,
    });
    res.status(201).json({ message: "success", data: user });
    //res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = {
  signupRouter,
}
