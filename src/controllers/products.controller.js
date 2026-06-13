import { fetchProducts, fetchProductById } from "../models/products.model.js"

export const createProduct = (req, res) => {
  const { title } = req.body

  res.status(201).json({ message: `Producto creado ${title}` })
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
