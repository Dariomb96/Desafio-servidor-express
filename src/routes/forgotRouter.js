import { Router } from "express";
import { forgotPassword, renderForgot } from "../controllers/forgot.controller.js";

const forgotRouter = Router();

forgotRouter.get("/", renderForgot);

forgotRouter.post("/", forgotPassword);

export default forgotRouter;