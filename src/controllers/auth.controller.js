import { generateToken } from "../utils/token-generator.js"

import jwt from "jsonwebtoken"

const defaultUser = {
  id: 1,
  email: "admin@example.com",
  password: "password123",
}

export const loginUser = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ error: "Email y password son requeridos" })
  }

  if (email !== defaultUser.email || password !== defaultUser.password) {
    return res.status(401).json({ error: "Credenciales inválidas" })
  }

  const token = generateToken({ id: defaultUser.id, email: defaultUser.email })

  return res.json({
    token,
  })
}
