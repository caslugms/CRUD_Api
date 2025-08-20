import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzfWvHZsqWFkiHgburVal9KpvH1CZy4a4",
  authDomain: "apiweb-894a2.firebaseapp.com",
  projectId: "apiweb-894a2",
  storageBucket: "apiweb-894a2.firebasestorage.app",
  messagingSenderId: "14001043262",
  appId: "1:14001043262:web:000290625edc8de5f0de6f",
  measurementId: "G-MV3VM7BKGF",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Exportar o banco de dados Firestore
export const db = getFirestore(app)

console.log("Firebase inicializado com sucesso!")
