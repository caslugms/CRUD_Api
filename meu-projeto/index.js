import express from "express";
import cors from "cors";
import { db } from "./meu-projeto/bd/firebaseAdmin"; // Corrigido para importar o db do firebaseAdmin
import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase-admin/firestore"; // Corrigido para o Admin SDK

const app = express();
app.use(cors());
app.use(express.json());

// Referência à coleção de usuários no Firestore
const usuariosRef = collection(db, "usuarios");

// Criar um novo usuário
app.post("/usuarios", async (req, res) => {
  try {
    const novoUsuario = await addDoc(usuariosRef, req.body);
    res.status(201).send({ id: novoUsuario.id });
  } catch (error) {
    res.status(500).send({ message: "Erro ao adicionar usuário", error: error.message });
  }
});

// Listar todos os usuários
app.get("/usuarios", async (req, res) => {
  try {
    const snapshot = await getDocs(usuariosRef);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(lista);
  } catch (error) {
    res.status(500).send({ message: "Erro ao listar usuários", error: error.message });
  }
});

// Atualizar um usuário
app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuarioDoc = doc(db, "usuarios", req.params.id);
    await updateDoc(usuarioDoc, req.body);
    res.send("Usuário atualizado com sucesso!");
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
  }
});

// Deletar um usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const usuarioDoc = doc(db, "usuarios", req.params.id);
    await deleteDoc(usuarioDoc);
    res.send("Usuário deletado com sucesso!");
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
