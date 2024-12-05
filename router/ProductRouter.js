import express from "express";
import ProductController from "../controller/ProductController.js";
import verifyUser from "../middleware/verifyUser.js";

const productRouter = express.Router();
const product = new ProductController();

productRouter.post("/", verifyUser, product.createProduct);
productRouter.get("/", verifyUser, product.getProduct);
productRouter.get("/:id", verifyUser, product.getProductById);
productRouter.delete("/:id", verifyUser, product.deleteProduct);
productRouter.patch("/:id", verifyUser, product.updateProduct);

export default productRouter;
