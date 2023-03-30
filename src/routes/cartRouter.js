import { Router } from "express";
import CartsManager from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartsManager.getCarts);
router.get("/:cid", CartsManager.getCartsById);
router.post("/", CartsManager.addCart);
router.get("/:cid/:pid", CartsManager.updateCartProducts);
router.delete("/:cid", CartsManager.deleteCart);
router.delete("/:cid/:pid", CartsManager.deleteCartProduct);
router.put("/:cid", CartsManager.updateCart);
router.put("/:cid/:pid", CartsManager.updateProductQuantity);
router.delete("/:cid", CartsManager.deleteAllCartProducts);

export default router;
