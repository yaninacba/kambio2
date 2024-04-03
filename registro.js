import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDukGl-6c2HfKaKie0FGJzWGeCBF-5hjsU",
  authDomain: "kambio-67f17.firebaseapp.com",
  projectId: "kambio-67f17",
  storageBucket: "kambio-67f17.appspot.com",
  messagingSenderId: "205221704558",
  appId: "1:205221704558:web:191ca7e10328d6abb9077f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Esta función se ejecutará cuando se haga clic en el botón "Guardar"
button.addEvenListener("click", guardar)

function guardar() {
    // Obtener los valores de los campos de texto
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;

    // Verificar si los campos están vacíos
    if (nombre === '' || apellido === '' || telefono === '') {
        alert("Por favor, complete todos los campos");
        return; // Salir de la función si algún campo está vacío
    }

    // Agregar el documento a la colección "Usuario" en Firestore
    addDoc(collection(db, "Usuario"), {
        Nombre: nombre,
        Apellido: apellido,
        Telefono: telefono
    })
    .then(() => {
        alert("Registrado exitosamente");
    })
    .catch((error) => {
        alert("No pudimos registrar la información, intenta nuevamente");
        console.error("Error al guardar documento: ", error);
    });
}
