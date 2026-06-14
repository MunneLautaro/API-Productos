import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const jwtSecret = process.env.JWT_SECRET_KEY

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" })
  }

  const [scheme, token] = authHeader.split(" ")

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Formato de token inválido" })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    req.user = payload
    return next()
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" })
  }
}
