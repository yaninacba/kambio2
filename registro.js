// Importa la instancia de la aplicación Firebase
import app from "./firebaseConfig";

// Ahora puedes usar la instancia de la aplicación Firebase donde la necesites en este archivo
// Por ejemplo, si necesitas acceder a la base de datos Firestore, puedes hacerlo aquí

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
