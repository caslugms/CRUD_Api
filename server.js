import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"

// Carregar variáveis do arquivo .env
dotenv.config()

// Criar aplicação Express
const app = express()
const PORT = 3000

// Middlewares básicos
app.use(cors()) // Permitir requisições de outros domínios
app.use(express.json()) // Ler dados JSON do body

// Rota inicial para testar se a API está funcionando
app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" })
})

// Usar as rotas de usuários
app.use("/api/users", userRoutes)

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
