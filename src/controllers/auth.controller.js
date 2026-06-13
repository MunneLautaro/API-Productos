export const loginUser = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ error: "Email y password son requeridos" })
  }

  return res.json({
    message: "Login exitoso",
    token: "demo-token",
  })
}
