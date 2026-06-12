import express from "express"
import cors from "cors"

import productsRouter from "./routes/products.js"
import authRouter from "./routes/auth.route.js"

import dotenv from "dotenv"
dotenv.config()

const app = express()

const whitelist = ["http://localhost:5173"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("No permitido por políticas de CORS (Empresa)"))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())

app.use("/api/products", productsRouter)

app.use("/api/auth", authRouter)

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: "Not Found",
    message: `La ruta ${req.originalUrl} con el método ${req.method} no existe en este servidor.`,
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
