import {
  createProductService,
  deleteAllProductsService,
  deleteProductService,
  getProductByIdService,
  getProductsService,
  updateProductService,
} from "../services/products.service.js"

export const createProduct = async (req, res) => {
  try {
    const { productData } = req.body
    const product = await createProductService(productData)

    res.status(201).json(product)
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al crear el producto" })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await getProductByIdService(id)

    res.json(product)
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al obtener el producto" })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params

    const { productData } = req.body

    const result = await updateProductService(id, productData)

    res.json(result)
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al actualizar el producto" })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const result = await deleteProductService(id)

    res.json(result)
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al eliminar el producto" })
  }
}

export const deleteAllProducts = async (req, res) => {
  try {
    const result = await deleteAllProductsService()

    res.json(result)
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al eliminar los productos" })
  }
}
