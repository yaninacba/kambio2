import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { collection, query, where, getDocs, getFirestore} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


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


//funcion para leer
document.getElementById("botonFlow").addEventListener("click", function() {
    mostrarDatos();
   console.log("Botón mostrar clickeado");
 });

 async function mostrarDatos() {
  try {
      // Obtener el elemento select por su id
      const selectElement = document.getElementById('flow');

      // Obtener el valor seleccionado del elemento select
      const selectedValue = selectElement.value;

      // Crear la consulta utilizando el valor seleccionado
      const q = query(collection(db, "usuario"), where("isla", "==", selectedValue));
      const querySnapshot = await getDocs(q);

      // Manejar los resultados de la consulta
      const datosContainer = document.getElementById('datosContainer');
      datosContainer.innerHTML = ''; // Limpiar contenido previo

      querySnapshot.forEach((doc) => {
          const datosDiv = document.createElement('div');
          datosDiv.textContent = `${doc.id} => ${JSON.stringify(doc.data())}`;
          datosContainer.appendChild(datosDiv);
      });
  } catch (error) {
      console.error("Error al recuperar datos:", error);
  }
}
