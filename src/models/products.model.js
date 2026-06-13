import db from "../config/firebase.js"

import { collection, getDocs } from "firebase/firestore"

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
