import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { addDoc, collection, getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlLngo2i5bBqXrF7uWh9Rk7LBetyvHth0",
  authDomain: "boris-f276f.firebaseapp.com",
  projectId: "boris-f276f",
  storageBucket: "boris-f276f.appspot.com",
  messagingSenderId: "277241048439",
  appId: "1:277241048439:web:c3c73d6263c6eeb5204572",
  measurementId: "G-0EJS7NMRLK"
};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log('hola probando');
  
  

 
 
  async function agregarDoumento(){
    try {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
  
    const docRef = await addDoc(collection(db, "usuario"), {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}    

