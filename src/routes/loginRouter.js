const { userModel } = require('../models/users');
const express = require('express');
const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login", { title: "Login", styles: "css/login.css" });
});

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await userModel.findOne({
      email: username,
      password: password,
    });
    if (response) {
      res.status(200).json({ message: "success", data: response });
    } else {
      res.status(404).json({ message: "error", data: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = {
  loginRouter,
}
