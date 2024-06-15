import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { collection, query, where, getDocs, getFirestore, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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

document.getElementById("botonHfc").addEventListener("click", function () {
    mostrarHfc();
    console.log("Botón mostrar clickeado");
});
document.getElementById("botonFlow").addEventListener("click", function () {
    mostrarFlow();
    console.log("Botón mostrar clickeado");
});
document.getElementById("botonMovil").addEventListener("click", function () {
    mostrarMovil();
    console.log("Botón mostrar clickeado");
});
document.getElementById("botonXdls").addEventListener("click", function () {
    mostrarX();
    console.log("Botón mostrar clickeado");
});

async function mostrarHfc() {
    mostrarDatos("conectividad");
}

async function mostrarFlow() {
    mostrarDatos("flow");
}

async function mostrarMovil() {
    mostrarDatos("movil");
}

async function mostrarX() {
    mostrarDatos("xdls");
}

async function mostrarDatos(isla) {
    try {
        const q = query(collection(db, "usuario"), where("isla", "==", isla));
        const querySnapshot = await getDocs(q);

        const datosContainer = document.getElementById('datosContainer');
        datosContainer.innerHTML = ''; // Limpiar contenido previo
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const datosDiv = document.createElement('div');
            datosDiv.innerHTML = `
                <p>Nombre: ${data.nombre}</p>
                <p>Apellido: ${data.apellido}</p>
                <p>Isla: ${data.isla}</p>
                <p>Turno: ${data.turno}</p>
                <p>Cambio por: ${data.cambiar}</p>
                <p>Fecha: ${data.fecha}</p>
            `;
            datosDiv.classList.add('dato');
            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Confirmar';
            confirmButton.classList.add('btn', 'btn-success');
            confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
            confirmButton.addEventListener('click', async () => {
                const telefono = data.telefono;
                if (telefono) {
                    const mensajeConfirmacion = `¿Estás seguro de que deseas confirmar el cambio, ${data.cambiar}?`;
                    const confirmarCambio = confirm(mensajeConfirmacion);
                    if (confirmarCambio) {
                        const mensaje = encodeURIComponent("Hola, confirmas el cambio para ?");
                        const enlaceWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
                        window.open(enlaceWhatsApp, '_blank');
                        setTimeout(async () => {
                            await eliminarDocumento(doc.id, datosDiv);
                        }, 2000);
                    } else {
                        console.log("La confirmación del cambio ha sido cancelada.");
                    }
                } else {
                    console.error("El documento no contiene un número de teléfono válido.");
                }
            });
            datosDiv.appendChild(confirmButton);
            datosContainer.appendChild(datosDiv);
        });
    } catch (error) {
        console.error("Error al recuperar datos:", error);
        alert("Error al recuperar datos.");
    }
}

async function eliminarDocumento(documentId, datosDiv) {
    try {
        await deleteDoc(doc(db, "usuario", documentId));
        console.log("Documento eliminado con éxito");
        const datosContainer = document.getElementById('datosContainer');
        datosContainer.removeChild(datosDiv);
    } catch (error) {
        console.error("Error eliminando documento:", error);
    }
}
