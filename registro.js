import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = initializeApp( {
    apiKey: "AIzaSyDlLngo2i5bBqXrF7uWh9Rk7LBetyvHth0",
    authDomain: "boris-f276f.firebaseapp.com",
    projectId: "boris-f276f",
    storageBucket: "boris-f276f.appspot.com",
    messagingSenderId: "277241048439",
    appId: "1:277241048439:web:c3c73d6263c6eeb5204572",
    measurementId: "G-0EJS7NMRLK"
  });
  const db = getFirestore(app);
  console.log('hola probando');
  const usuarioColec = collection(db, "usuario");
 
  async function agregarDoumento(){
    const nuevoDoc= addDoc(usuarioColec, {
        nombre: document.getElementById('nombre');
        apellido: document.getElementById('apellido');
        telefono: document.getElementById('telefono');
    });
  }
