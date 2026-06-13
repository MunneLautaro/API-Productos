import db from "../config/firebase.js"

import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"

const productsCollection = collection(db, "products")

export const fetchProducts = async () => {
  const snapshot = await getDocs(productsCollection)

  const products = []

  snapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return products
}

export const fetchProductById = async (productoId) => {
  try {
    const docRef = doc(db, "products", productoId)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const producto = { id: docSnap.id, ...docSnap.data() }
      return producto
    } else {
      return null
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error)
  }
}

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsCollection, productData)
    return docRef.id
  } catch (error) {
    console.error("Error al crear el producto:", error)
  }
}

export const changeProduct = async (productId, updatedData) => {
  try {
    const docRef = doc(db, "products", productId)
    await updateDoc(docRef, updatedData)
    return true
  } catch (error) {
    console.error("Error al actualizar el producto:", error)
    return false
  }
}

export const removeProduct = async (productId) => {
  try {
    const docRef = doc(db, "products", productId)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error al eliminar el producto:", error)
    return false
  }
}
