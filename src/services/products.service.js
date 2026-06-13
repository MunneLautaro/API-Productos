import {
  fetchProducts,
  fetchProductById,
  addProduct,
  changeProduct,
  removeProduct,
} from "../models/products.model.js"

const createServiceError = (statusCode, message) => {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

const validateProductData = (productData) => {
  if (!productData || !productData.title || !productData.price) {
    throw createServiceError(422, "El formato del producto es inválido")
  }
}

export const createProductService = async (productData) => {
  validateProductData(productData)

  const productId = await addProduct(productData)

  return { id: productId, ...productData }
}

export const getProductsService = async () => {
  return await fetchProducts()
}

export const getProductByIdService = async (productId) => {
  const product = await fetchProductById(productId)

  if (!product) {
    throw createServiceError(404, "Producto no encontrado")
  }

  return product
}

export const updateProductService = async (productId, productData) => {
  validateProductData(productData)

  const product = await fetchProductById(productId)

  if (!product) {
    throw createServiceError(404, "Producto no encontrado")
  }

  const result = await changeProduct(productId, productData)

  if (!result) {
    throw createServiceError(400, "Error al actualizar el producto")
  }

  return {
    message: `Se actualizo el ${productData.title} del ID ${productId}`,
  }
}

export const deleteProductService = async (productId) => {
  const product = await fetchProductById(productId)

  if (!product) {
    throw createServiceError(404, "Producto no encontrado")
  }

  const result = await removeProduct(productId)

  if (!result) {
    throw createServiceError(400, "Error al eliminar el producto")
  }

  return {
    message: `Se eliminó el producto del ID ${productId}`,
  }
}
