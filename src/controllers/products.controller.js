import {
  fetchProducts,
  fetchProductById,
  addProduct,
  changeProduct,
} from "../models/products.model.js"

export const createProduct = async (req, res) => {
  try {
    const { productData } = req.body
    if (!productData || !productData.title || !productData.price) {
      return res
        .status(422)
        .json({ error: "El formato del producto es inválido" })
    }
    const productId = await addProduct(productData)
    res.status(201).json({ id: productId, ...productData })
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await fetchProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await fetchProductById(id)
    console.log(product)

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params

    const { productData } = req.body
    if (!productData || !productData.title || !productData.price) {
      return res
        .status(422)
        .json({ error: "El formato del producto es inválido" })
    }

    const result = await changeProduct(id, productData)

    if (result) {
      res.json({ message: `Se actualizo el ${productData.title} del ID ${id}` })
    } else {
      res.status(400).json({ error: "Error al actualizar el producto" })
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" })
  }
}

export const deleteProduct = (req, res) => {
  const { id } = req.params

  if (id != 1) {
    return res.status(404).json({ error: "Producto no encontrado" })
  }

  res.json({ message: `Producto ID ${id} borrado` })
}
