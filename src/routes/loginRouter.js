import express from "express";
import { login } from "../controllers/login.controller.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login", { title: "Login", styles: "css/login.css" });
});

loginRouter.post("/", login);

export default loginRouter;