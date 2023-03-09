const { userModel } = require('../models/users');
const express = require('express');
const { isValidPassword } = require("../utils.js");

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login", { title: "Login", styles: "css/login.css" });
});

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await userModel.findOne({
      email: username,
    });
    if (response) {
      if (isValidPassword(password, response.password)) {
        req.session.user = response;
        res.status(200).json({ message: "success", data: response });
      } else {
        res.status(401).json({
          message: "error",
          data: "Error, por favor revisa tus credenciales.",
        });
      }
    } else {
      res.status(404).json({
        message: "error",
        data: "Algo ha pasado, consulta al administrador",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = {
  loginRouter,
}
