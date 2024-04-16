import { collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


async function mostrarDatos() {
    try {
      const querySnapshot = await getDocs(collection(db, "usuario"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  }
  
  document.getElementById("buscar").addEventListener("click", function() {
    mostrarDatos();
   console.log("Botón buscar clickeado");
 });
  