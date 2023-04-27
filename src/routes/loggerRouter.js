import { Router } from "express";
import { addLogger } from "../logger.js";

const loggerRouter = Router();

loggerRouter.use(addLogger);

loggerRouter.get("/", (req, res) => {
  req.logger.warning("Prueba de alerta");

  res.send({ message: "Prueba de logger" });
});