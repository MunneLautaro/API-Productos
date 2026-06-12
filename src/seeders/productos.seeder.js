import db from "../config/firebase.js"

import { collection, addDoc, getDocs } from "firebase/firestore"

const productsCollection = collection(db, "products")

const productsSeeders = [
  {
    titulo: "Auriculares Inalámbricos Pro",
    descripcion:
      "Auriculares con cancelación activa de ruido, bluetooth 5.2 y hasta 30 horas de autonomía con el estuche de carga.",
    precio: 89.99,
    stock: 45,
  },
  {
    titulo: "Teclado Mecánico RGB",
    descripcion:
      "Teclado mecánico con interruptores redondos y retroiluminación RGB personalizable para gaming.",
    precio: 59.5,
    stock: 20,
  },
  {
    titulo: "Ratón Ergonómico Vertical",
    descripcion:
      "Ratón inalámbrico diseñado para reducir la tensión muscular y mejorar la postura de la muñeca durante largas jornadas.",
    precio: 34.99,
    stock: 15,
  },
  {
    titulo: 'Monitor Gaming 27" 4K',
    descripcion:
      "Pantalla UHD con tasa de refresco de 144Hz y tiempo de respuesta de 1ms, ideal para entusiastas de los videojuegos.",
    precio: 349.0,
    stock: 8,
  },
  {
    titulo: "Mochila Impermeable para Portátil",
    descripcion:
      "Mochila con compartimento acolchado para laptops de hasta 15.6 pulgadas y puerto de carga USB integrado.",
    precio: 42.0,
    stock: 60,
  },
  {
    titulo: "Silla Ergonómica de Escritorio",
    descripcion:
      "Silla de oficina con soporte lumbar ajustable, reposacabezas y reposabrazos 3D, tejido de malla transpirable.",
    precio: 189.99,
    stock: 12,
  },
  {
    titulo: "Altavoz Bluetooth Portátil",
    descripcion:
      "Altavoz resistente al agua (IPX7) con sonido estéreo de alta fidelidad y batería de 12 horas de duración.",
    precio: 24.95,
    stock: 110,
  },
  {
    titulo: "Cargador Rápido GaN 65W",
    descripcion:
      "Cargador de pared compacto con tecnología GaN, incluye 2 puertos USB-C y 1 puerto USB-A para carga simultánea.",
    precio: 29.99,
    stock: 85,
  },
  {
    titulo: "Disco Duro Externo SSD 1TB",
    descripcion:
      "Unidad de estado sólido portátil con velocidad de lectura de hasta 1050 MB/s y conexión USB 3.2 Gen 2.",
    precio: 115.0,
    stock: 22,
  },
  {
    titulo: "Lámpara de Escritorio LED",
    descripcion:
      "Lámpara con control táctil, 5 modos de color, 10 niveles de brillo y temporizador de apagado automático.",
    precio: 19.99,
    stock: 40,
  },
]

const createProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection)
    const docAmount = snapshot.size

    if (docAmount === 0) {
      for (const product of productsSeeders) {
        await addDoc(productsCollection, product)
      }

      console.log("Se agregaron los productos")
    } else {
      console.log(
        "Ya existen productos en la colección, no se crearon nuevos productos.",
      )
    }
  } catch (error) {
    console.error("Hubo un error al procesar el seeder:", error)
  } finally {
    console.log("Cerrando proceso...")
    process.exit(0)
  }
}

createProducts()
