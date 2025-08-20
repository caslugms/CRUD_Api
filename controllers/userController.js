import { db } from "../config/firebase.js"

// Coleção de usuários no Firestore
const users = db.collection("users")

// Listar todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await users.get()
    const userList = []

    // Percorrer todos os documentos
    snapshot.forEach((doc) => {
      userList.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    res.json(userList)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" })
  }
}

// Buscar usuário por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const doc = await users.doc(id).get()

    if (!doc.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    })
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" })
  }
}

// Criar novo usuário
export const createUser = async (req, res) => {
  try {
    const { nome, email, idade } = req.body

    // Validação simples
    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" })
    }

    // Dados do usuário
    const userData = {
      nome,
      email,
      idade: idade || null,
      criadoEm: new Date(),
    }

    // Adicionar no Firestore
    const docRef = await users.add(userData)

    res.status(201).json({
      id: docRef.id,
      ...userData,
      message: "Usuário criado com sucesso",
    })
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" })
  }
}

// Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email, idade } = req.body

    // Verificar se usuário existe
    const doc = await users.doc(id).get()
    if (!doc.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    // Dados para atualizar
    const updateData = {}
    if (nome) updateData.nome = nome
    if (email) updateData.email = email
    if (idade) updateData.idade = idade
    updateData.atualizadoEm = new Date()

    // Atualizar no Firestore
    await users.doc(id).update(updateData)

    res.json({ message: "Usuário atualizado com sucesso" })
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" })
  }
}

// Deletar usuário
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar se usuário existe
    const doc = await users.doc(id).get()
    if (!doc.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    // Deletar do Firestore
    await users.doc(id).delete()

    res.json({ message: "Usuário deletado com sucesso" })
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" })
  }
}
