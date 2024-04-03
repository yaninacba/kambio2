
import db from "./firebase";

function guardar(){
    db.collection("Usuario").add({
        Nombre: document.getElementById("nombre").value,
        Apellido:document.getElementById("apellido").value,
        Telefono: document.getElementById("telefono").value,
    })
    .then((docRef) => {
        alert("Registrado exitosamente")
    })
    .catch((error) => {
        alert("No pudimos registrar la informacion intenta nuevamente")
    });
}