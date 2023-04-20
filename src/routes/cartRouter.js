import { Router } from "express";
import CartsManager from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/", CartsManager.getCarts);
cartRouter.get("/:cid", CartsManager.getCartsById);
cartRouter.post("/", CartsManager.addCart);
cartRouter.get("/:cid/:pid", CartsManager.updateCartProducts);
cartRouter.delete("/:cid", CartsManager.deleteCart);
cartRouter.delete("/:cid/:pid", CartsManager.deleteCartProduct);
cartRouter.put("/:cid", CartsManager.updateCart);
cartRouter.put("/:cid/:pid", CartsManager.updateProductQuantity);
cartRouter.delete("/:cid", CartsManager.deleteAllCartProducts);
cartRouter.put("/:cid/purchase", CartsManager.purchaseCart)

export {cartRouter};
