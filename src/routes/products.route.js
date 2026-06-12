import { Router } from "express"
const router = Router()

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js"

router.get("/", getProducts)
router.get("/:id", getProductById)

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router
