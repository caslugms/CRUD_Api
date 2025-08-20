import admin from "firebase-admin"

// Inicializar Firebase Admin (apenas uma vez)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "apiweb-894a2", // ID do seu projeto Firebase
  })
}

// Exportar o banco de dados Firestore
export const db = admin.firestore()
