const { userModel } = require('../models/users');
const express = require('express');
const profileRouter = express.Router();


profileRouter.get("/", (req, res) => {
  res.render("products", { title: "Login", styles: "css/profile.css" });
});

module.exports = {
  profileRouter,
}
