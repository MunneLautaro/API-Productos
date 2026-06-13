import { fetchProducts } from "../models/products.model.js"

export const createProduct = (req, res) => {
  const { title } = req.body

  res.status(201).json({ message: `Producto creado ${title}` })
}

export const getProducts = async (req, res) => {
  const products = await fetchProducts()
  res.json(products)
}
export const getProductById = (req, res) => {
  const { id } = req.params

  res.json({
    message: `Producto con ID ${id}`,
  })
}

export const updateProduct = (req, res) => {
  const { id } = req.params

  if (id != 1) {
    return res.status(404).json({ error: "Producto no encontrado" })
  }

  const { title } = req.body

  if (!title) {
    return res.status(422).json({ error: "El title es requerido" })
  }

  res.json({ message: `Se actualizo el ${title} del ID ${id}` })
}

export const deleteProduct = (req, res) => {
  const { id } = req.params

  if (id != 1) {
    return res.status(404).json({ error: "Producto no encontrado" })
  }

  res.json({ message: `Producto ID ${id} borrado` })
}
