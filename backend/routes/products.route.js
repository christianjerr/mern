import express from "express";
import {
  createProduct,
  getProduct,
  getIndividualProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

// create
router.post("/", createProduct);

// read
router.get("/", getProduct);

router.get("/:id", getIndividualProduct);

// update
router.put("/:id", updateProduct);

// delete
router.delete("/:id", deleteProduct);

export default router;
