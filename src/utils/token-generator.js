import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secretKey = process.env.JWT_SECRET_KEY

export const generateToken = (payload) => {
  const user = {
    id: payload.id,
    email: payload.email,
  }
  const expiration = { expiresIn: "1h" }

  return jwt.sign(user, secretKey, expiration)
}
