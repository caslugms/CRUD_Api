import express from "express";
import cors from "cors";
import { db } from "./meu-projeto/bd/firebaseAdmin";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

const usuariosRef = collection(db, "usuarios");

app.post("/usuarios", async (req, res) => {
  try {
    const novoUsuario = await addDoc(usuariosRef, req.body);
    res.status(201).send({ id: novoUsuario.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const snapshot = await getDocs(usuariosRef);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(lista);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuarioDoc = doc(db, "usuarios", req.params.id);
    await updateDoc(usuarioDoc, req.body);
    res.send("Usuário atualizado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const usuarioDoc = doc(db, "usuarios", req.params.id);
    await deleteDoc(usuarioDoc);
    res.send("Usuário deletado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
